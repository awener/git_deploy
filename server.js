const app = require('express')();
const bodyParser = require('body-parser');
const config = require("./config");
const hmac = require("./hmac");
const rebuild = require('./rebuild');
app.use(bodyParser());

app.use(function(req, res, next) {
  const signature = req.headers['x-hub-signature'];
  const event = req.headers['x-github-event'];
  const content = req.body;
  if(!signature || !content || !event) return errorHandling(false);
  if(!hmac(content, signature, config.password)) return errorHandling(false);

  const repo = req.body.repository.name;
  if(config.event.indexOf(event) === -1 || config.repository.indexOf(repo) === -1) return errorHandling(false);


  return next();

  function errorHandling(valid) {
    return res.status(500).jsonp({ error: "dirty bit" });
  }
});

app.post("/deploy", function(req, res) {

  return rebuild(config,function() {
    return res.status(200).end();
  });
});





app.listen("3005");
