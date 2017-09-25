const app = require('express')();
const bodyParser = require('body-parser');
const config = require("./config/config");

global.CONFIG = config;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes")(app);







app.listen(config.server.port);
