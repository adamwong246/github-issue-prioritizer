var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    // debug: true,
    // protocol: "https",
    // host: "github.com",
    // // pathPrefix: "/api/v3", // for some GHEs
    // timeout: 5000
});

github.issues.repoIssues({
    // optional:
    // headers: {
    //     "cookie": "blahblah"
    // },
    user: "adamwong246",
    repo: "github-issue-prioritizer"
}, function(err, res) {
    console.log(JSON.stringify(res));
});