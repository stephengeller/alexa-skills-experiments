class QuotePicker {
	constructor(name, db) {
		this.name = name.toLowerCase();
		this.db = db;
	}

	getQuote() {
		this.db.findOne(this.name);
	}
}

module.exports = QuotePicker;