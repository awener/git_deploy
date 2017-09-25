const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HistorySchema = new Schema({
	repository: {
		type: String,
	},
	user: {
		type: String,
	},
	email: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now()
	}


});


module.exports = mongoose.model("history", HistorySchema);
