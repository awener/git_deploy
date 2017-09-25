const app = require('express')();
const bodyParser = require('body-parser');
const config = require("./config/config");
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');


mongoose.connect(config.db.host, config.db.options);
global.CONFIG = config;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes")(app);







app.listen(config.server.port);
