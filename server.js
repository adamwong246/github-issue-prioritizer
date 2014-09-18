var url       = require('url'),
    http      = require('http'),
    https     = require('https'),
    fs        = require('fs'),
    qs        = require('querystring'),
    github    = require('octonode'),
    node2json = require('node-json2html'),
    express   = require('express'),
    session   = require('express-session'),
    gip       = require ("./index.js"),
    app       = express();

app.use(session({secret:'somesecrettokenhere'}));

// Load config defaults from JSON file.
// Environment variables override defaults.
function loadConfig() {
  var config = JSON.parse(fs.readFileSync(__dirname+ '/config.json', 'utf-8'));
  for (var i in config) {
    config[i] = process.env[i.toUpperCase()] || config[i];
  }
  console.log('Configuration');
  console.log(config);
  return config;
}

var config = loadConfig();

function authenticate(code, cb) {
  var data = qs.stringify({
    client_id: config.oauth_client_id,
    client_secret: config.oauth_client_secret,
    code: code
  });

  var reqOptions = {
    host: config.oauth_host,
    port: config.oauth_port,
    path: config.oauth_path,
    method: config.oauth_method,
    headers: { 'content-length': data.length }
  };

  var body = "";
  var req = https.request(reqOptions, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) { body += chunk; });
    res.on('end', function() {
      cb(null, qs.parse(body).access_token);
    });
  });

  req.write(data);
  req.end();
  req.on('error', function(e) { cb(e.message); });
}

app.use(express.static('.'));

app.set('view engine', 'jade');

// Convenience for allowing CORS on routes - GET only
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/authenticate', function(req, res) {
  authenticate(req.query.code, function(err, token) {
    var result = err || !token ? {"error": "bad_code"} : { "token": token };

    req.session.ghToken = token;

    res.redirect("/landing");

  });

});

app.get('/landing', function(req, res) {
    var client = github.client(req.session.ghToken);
    var ghme   = client.me();
    // var ghrepo = client.repo('adamwong246/github-issue-prioritizer');
    var ghrepo = client.repo('hubbubhealth/hubbub-main');

    var issues = ghrepo.issues(function(err, data, headers) {
      console.log("error: " + JSON.stringify(err));
      console.log("data: " + JSON.stringify(data));
      console.log("headers:" + JSON.stringify(headers));

      res.render('template', {"pretty": true, "results": new gip(data).output(), "datetime": new Date()});
      // res.json(data);  
    });
    // console.log(JSON.stringify(result));
});

var port = process.env.PORT || config.port || 9999;

app.listen(port, null, function (err) {
  console.log('Github-Issue-Prioritizer, at your service: http://localhost:' + port);
});
