const LogState = {
	PROGRESS: "      ",
	OK: "  OK  ",
	FAILED: "FAILED"
};

const LogLevel = {
	INFO: "INFO",
	WARN: "WARN",
	ERROR: "ERROR"
};

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

	return `${digitPair(time, 24)}:${minutes}:${seconds} `;
}

function append(message, options = log.options) {
	let prefix = options.state || log.options.state ? `[${options.state}] ` : "";

	prefix += options.timestamp || log.options.timestamp ? `${timestamp()} ` : "";

	prefix += options.level || log.options.level ? `${options.level}: ` : "";

	console.log(prefix + (typeof message == "string" ? message : JSON.stringify(message)));

	return log;
}

function write(message, options = log.options) {
	return log.clear().append(message, options);
}

function clear() {
	console.clear();

	return log;
}

const log = {
	append: append,
	write: write,
	clear: clear,
	options: {
		state: undefined,
		timestamp: undefined,
		level: undefined
	}
};

module.exports = { log, LogState, LogLevel };