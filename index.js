var fastmatter = require('fastmatter');
var GitHubApi = require("github");
var moment = require('moment');
var eyes = require('eyes');
var _ = require('lodash');
moment().format();

var GIP = function () {
  // Construct object
};

GIP.prioritizeIssue = function(h){
    var days = moment(h.due_date).diff(moment(), 'days');
    return (h.points || 0) + (h.business_value || 0) + (h.technical_value || 0) + (h.completion || 0) + days;
};

GIP.prioritizeIssues = function(results){
    var a = _.map(results, function(h){
        h.priority = fastmatter(h.body);
        return h;
    });
    return _.map(a, function(h){
        h.priority.calculated = GIP.prioritizeIssue(h.priority.attributes);
        return h;
    });
};

module.exports = GIP;

var github = new GitHubApi({
    version: "3.0.0",
});

github.issues.repoIssues({
    user: "adamwong246",
    repo: "github-issue-prioritizer"
}, function(err, res) {
    console.log(JSON.stringify(GIP.prioritizeIssues(res)));
});
