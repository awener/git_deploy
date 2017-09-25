
const git = require("../controllers/git");
const auth = require("../controllers/auth");
const api = require("../controllers/api");
module.exports = function(app) {


  app.get("/", api.hello);
  app.post("/login", auth.login);
  app.post("/deploy", git.verify, git.pull);
  app.post("/api/last", auth.verify, api.last);



}
