// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  serverURL: "https://your-app-name.herokuapp.com/parse",
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  
 /* verifyUserEmails: true,
    emailVerifyTokenValidityDuration: 2 * 60 * 60,
    preventLoginWithUnverifiedEmail: false,
      publicServerURL: 'https://badgit.herokuapp.com/parse',
    appName: 'badgit',
    
    emailAdapter: {
        module: 'parse-server-simple-mailgun-adapter',
        options: {
        // The address that your emails come from
        fromAddress: 'postmaster@grayscaletechnologies.com',
        // Your domain from mailgun.com
        domain: 'grayscaletechnologies.com',
        // Your API key from mailgun.com
        apiKey: 'key-8cf7b4cde813b07f67d13ac7b148eb33',
    }
  },
    
    customPages: {
 //   invalidLink: 'http://yourpage/link_invalid.html',
    verifyEmailSuccess: 'http://blink-interactive.com/nutrics/zz/verify_email_success.html',
    choosePassword: 'http://blink-interactive.com/nutrics/zz/choose_password.html',
    passwordResetSuccess: 'http://blink-interactive.com/nutrics/zz/password_reset_success.html'
  },
*/
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
  
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
