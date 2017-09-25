const jwt = require("jsonwebtoken");


exports.login = function(req, res) {
    const password = req.body.password;
    if(password !== CONFIG.auth.password) return res.status(500).jsonp({ error: "Invalid login" });

    const token = jwt.sign({}, CONFIG.server.secret, {
      expiresIn: CONFIG.server.expire
    });

    return res.status(200).jsonp({token: token});
}

exports.verify = function(req, res, next) {
  const deploy = req.headers['deploy-token'];
  if(!deploy) return res.status(500).jsonp({error: "no token header" });
  jwt.verify(req.headers['deploy-token'], CONFIG.server.secret, function(err, decode) {
    if(err) return res.status(500).jsonp({ error: "Invalid token" });
    return next();

  });
}
