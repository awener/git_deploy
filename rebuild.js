const exec = require('child_process').exec;

module.exports = function(config, callback) {
  const cmd = `cd ${config.pwd}; git pull origin master; pm2 restart ${config.app}`;
  return exec(cmd, callback);
}
