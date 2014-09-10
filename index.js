var fastmatter = require('fastmatter');
var GitHubApi = require("github");

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
            })
        )
    );
});