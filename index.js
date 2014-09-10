var fastmatter = require('fastmatter');
var GitHubApi = require("github");
var moment = require('moment');
moment().format();

var priority = function(h){
    var days = moment(h.due_date).diff(moment(), 'days');
    return h.business_value + h.technical_value + h.completion + days;
};

var github = new GitHubApi({
    version: "3.0.0",
});

github.issues.repoIssues({
    user: "adamwong246",
    repo: "github-issue-prioritizer"
}, function(err, res) {
    console.log(
        JSON.stringify(
            res.map(function(h){
                h.priority = fastmatter(h.body);
                return h;
            }).map(function(h){
                h.priority.calculated = priority(h.priority.attributes);
                return h;
            })
        )
    );
});