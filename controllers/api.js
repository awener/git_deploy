const History = require("../models/history");


exports.hello = function(req, res) {
  return res.status(200).jsonp({ message: "Welcome - " });

}

exports.last = function(req, res) {
History.findOne({}).sort({created: -1}).exec(function(err, resp) {
    return res.status(200).jsonp({ user: resp });

  });
}
