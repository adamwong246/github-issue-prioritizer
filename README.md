<<<<<<< HEAD
github-issue-prioritizer
========================

##### example
Insert the following json into a issue description *as YAML frontmatter.* See issues for in this repo for more examples. 
```json
{
    "due_date": "Jan 1st 2015",   // any format you like
    "business_value": 15,         // -100..100, where -100 is bankruptcy and 100 is bought-out-by-google
    "technical_value": 10,        // -100..100, where -100 sets fire to the server and 100 is impossible
    "completion": 75,             // 0..100, where 0 is not-yet-started and 100 is done
    "blockers": [                 // a list of issues which block this issue
        1,
        2,
        3
    ],
    "points": 0                   // anything, primarily used for testing
}
```

=======
Gatekeeper
==========

Because of some [security-related limitations](http://blog.vjeux.com/2012/javascript/github-oauth-login-browser-side.html), Github prevents you from implementing the OAuth Web Application Flow on a client-side only application.

This is a real bummer. So we built Gatekeeper, which is the missing piece you need in order to make it work.

Gatekeeper works well with [Github.js](http://github.com/michael/github), which helps you accessing the [Github API](http://developer.github.com/v3/) from the browser.

## API

```
GET http://localhost:9999/authenticate/TEMPORARY_CODE
```

## OAuth Steps

Also see the [documentation on Github](http://developer.github.com/v3/oauth/).

1. Redirect users to request GitHub access.

   ```
   GET https://github.com/login/oauth/authorize
   ```

2. GitHub redirects back to your site including a temporary code you need for the next step.

   You can grab it like so:

   ```js
   var code = window.location.href.match(/\?code=(.*)/)[1];
   ```

3. Request the actual token using your instance of Gatekeeper, which knows your `client_secret`.

   ```js
   $.getJSON('http://localhost:9999/authenticate/'+code, function(data) {
     console.log(data.token);
   });
   ```

## Setup your Gatekeeper

1. Clone it

    ```
    git clone git@github.com:prose/gatekeeper.git
    ```

2. Install Dependencies

    ```
    cd gatekeeper && npm install
    ```

3. Adjust config.json

   ```json
   {
     "oauth_client_id": "GITHUB_APPLICATION_CLIENT_ID",
     "oauth_client_secret": "GITHUB_APPLICATION_CLIENT_SECRET",
     "oauth_host": "github.com",
     "oauth_port": 443,
     "oauth_path": "/login/oauth/access_token",
     "oauth_method": "POST",
     "port": 9999
   }
   ```

   You can also set environment variables to override the settings if you don't want Git to track your adjusted config.json file. Just use UPPER_CASE keys.

4. Serve it

   ```
   $ node server.js
   ```

## Deploy on Heroku

### Heroku Button

Use the button below to instantly setup your own Gatekeeper instance on Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### Heroku manually

1. Create a new Heroku app

   ```
   heroku apps:create APP_NAME
   ```

3. Provide OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET:

   ```
   heroku config:set OAUTH_CLIENT_ID=XXXX OAUTH_CLIENT_SECRET=YYYY
   ```

4. Push changes to heroku

   ```
   git push heroku master
   ```
OR

   ```
   heroku restart
   ```
>>>>>>> gatekeeper
