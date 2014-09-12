var fs = require('fs');
var path = require('path')
var fastmatter = require('fastmatter');
var GitHubApi = require("github");
var moment = require('moment');
var jade = require('jade');
var eyes = require('eyes');
var _ = require('lodash');
moment().format();

var GIP = function (results) {
    this.parsed = _.map(results, function(h){
        h.priority = fastmatter(h.body);
        return h;
    });
};

GIP.prototype.output = function(){

    var this2 = this;

    var prioritizeIssue = function(h){

        var calculatedBlockers = function(h){

            if (Object.prototype.toString.call( h.blockers ) === '[object Array]') {

                return _.reduce(h.blockers, function(memo, num){

                    var d = _.filter(this2.parsed, function(obj){
                        return obj.number == num;
                    })[0];

                    if ( typeof d !== 'undefined' && d ){
                        return memo + prioritizeIssue(d.priority.attributes);
                    } else {
                        return memo + 0;
                    }

                }, 0);

            } else {
                return 0;
            }
        };


        var days = moment(h.due_date).diff(moment(), 'days');
        return (h.points || 0) +
            (h.business_value || 0) +
            (h.technical_value || 0) +
            (h.completion || 0) +
            calculatedBlockers(h) +
            days;
    };

    return _.map(this.parsed, function(h){
        h.priority.calculated = prioritizeIssue(h.priority.attributes);
        return h;
    });
};

module.exports = GIP;

//////////////////////////////////
var config = {
    // "cache": "./cache.json",
    "input": "./tmp/cache.json",
    "output": "./tmp/out.html"
};


var raw = "";

//////////////////////////////////
if (!(typeof config["input"] === 'undefined')) {
    console.log("reading from: " + config["input"]);
    raw = new GIP(require(config["input"])).output();
} else {
    console.log("reading from github: ");
    var github = new GitHubApi({
        version: "3.0.0",
    });

    github.issues.repoIssues({
        user: "adamwong246",
        repo: "github-issue-prioritizer"
    }, function(err, res) {

        if (!(typeof config["cache"] === 'undefined')) {
            fs.writeFileSync(config["cache"], JSON.stringify(res, null, 1));
        }

        raw = new GIP(res).output();
        console.log(JSON.stringify(raw));
    });

}

if (typeof config["output"] === 'undefined') {
    console.log(JSON.stringify(raw, null, 1));
} else {
    console.log("writing to: " + config["output"]);
    switch(path.extname(config["output"])) {
    case '.json':
        fs.writeFileSync(config["output"], JSON.stringify(raw, null, 1));
        break;
    case '.html':
        fs.writeFileSync(config["output"],
            jade.renderFile('templates/template.jade', {"pretty": true, "self": raw})
        );
        break;
}
}