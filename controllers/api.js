

exports.hello = function(req, res) {
  return res.status(200).jsonp({ message: "Welcome - " });

}

exports.last = function(req, res) {
  res.status(200).jsonp({ list: "last list" });
}
