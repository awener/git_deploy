const crypto = require('crypto');

module.exports = function(content, signature, password) {
    try {
      let hash = "sha1=" + crypto.createHmac("sha1", password).update(JSON.stringify(content)).digest("hex");
      return hash === signature;
    } catch(e) {
      return false;
    }
}
