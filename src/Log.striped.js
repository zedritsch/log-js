function digitPair(number, base) {
	const string = (Math.floor(number) % base).toString();

	return string.length == 1 ? `0${string}` : string;
}

function timestamp() {
	let time = Date.now() / 1000;

	const seconds = digitPair(time, 60);
	time /= 60;

	const minutes = digitPair(time, 60);
	time /= 60;

	return `${digitPair(time, 24)}:${minutes}:${seconds}`;
}

module.exports = {
	options: {},

	append: function (message, options = {}) {
		options = {
			state: options.state || this.options.state,
			timestamp: options.timestamp || this.options.timestamp,
			level: options.level || this.options.level
		};

		let prefix = options.state ? `[${options.state}] ` : "";
		prefix += options.timestamp ? `${timestamp()} ` : "";
		prefix += options.level ? `${options.level}: ` : "";

		console.log(prefix + (typeof message == "string" ? message : JSON.stringify(message)));

		return this;
	},

	write: function (message, options = {}) {
		return this.clear().append(message, options);
	},

	clear: function () {
		console.clear();

		return this;
	}
};