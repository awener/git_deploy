const crypto = require("crypto");
const exec = require('child_process').exec;
const History = require("../models/history");
exports.verify = function(req, res, next) {
  const signature = req.headers['x-hub-signature'];
  const event = req.headers['x-github-event'];
  const content = req.body;
  if(!signature || !content || !event) return errorHandling(false);
  if(!hmac(content, signature, CONFIG.password)) return errorHandling(false);

  const repo = req.body.repository.name;
  if(CONFIG.event.indexOf(event) === -1 || CONFIG.repository.indexOf(repo) === -1) return errorHandling(false);


  return next();

  function errorHandling(valid) {
    return res.status(500).jsonp({ error: "dirty bit" });
  }

  function hmac(content, signature, password) {
    try {
      let hash = "sha1=" + crypto.createHmac("sha1", password).update(JSON.stringify(content)).digest("hex");
      return hash === signature;
    } catch(e) {
      return false;
    }

  }
}

exports.pull = function(req, res) {
  const repository = req.body.repository.name;
  const user = req.body.pusher.name;
  const email = req.body.pusher.email;
  const cmd = `cd ${CONFIG.pwd}; git pull origin master; pm2 restart ${CONFIG.app}`;
  return exec(cmd, function() {
    let saveDeployment = new History({
      repository: repository,
      user: user,
      email:  email
    }).save(function() {
      return res.status(200).end();
    });

  });
}
