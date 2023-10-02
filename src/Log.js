// @ts-check

/**
 * Implemented states for the logger
 * @see {@link log.options} for further information
 * @since `1.0.0`
 * @enum {string}
 */
const LogState = {
	/**
	 * Empty/Unresolved state.
	 * Displays as `[      ]` before message
	 * @since `1.0.0`
	 */
	PROGRESS: "      ",

	/**
	 * OK/Finished state.
	 * Displays as `[  OK  ]` before message
	 * @since `1.0.0`
	 */
	OK: "  OK  ",

	/**
	 * Failed stats.
	 * Displays as `[FAILED]` before message
	 * @since `1.0.0`
	 */
	FAILED: "FAILED"
};

/**
 * Implemented levels for the logger
 * @see {@link log.options} for further information
 * @since `1.0.0`
 * @enum {string}
 */
const LogLevel = {
	/**
	 * Show plain message.
	 * Displays as `INFO:` before message
	 * @since `1.0.0`
	 */
	INFO: "INFO",

	/**
	 * Show message as warning.
	 * Displays as `WARN:` before message
	 * @since `1.0.0`
	 */
	WARN: "WARN",

	/**
	 * Show message as error.
	 * Displays as `ERROR:` before message
	 * @since `1.0.0`
	 */
	ERROR: "ERROR"
};

/**
 * @typedef {{
 * 	state?: LogState,
 * 	timestamp?: boolean,
 * 	level?: LogLevel
 * }} LogOptions
 */

/**
 * @param {number} number
 * @param {number} base
 * @returns {string}
 */
function digitPair(number, base) {
	const string = (Math.floor(number) % base).toString();

	return string.length == 1 ? `0${string}` : string;
}

/**
 * @returns {string}
 */
function timestamp() {
	let time = Date.now() / 1000;

	const seconds = digitPair(time, 60);
	time /= 60;

	const minutes = digitPair(time, 60);
	time /= 60;

	return `${digitPair(time, 24)}:${minutes}:${seconds} `;
}

/**
 * Write new stuff to console
 * @param {*} message Data to *append* to the console
 * @param {LogOptions} options Onetime option overrides (@see {@link log.options} for further information)
 * @returns {{
 * 	append: Function,
 * 	write: Function,
 * 	clear: Function
 * }} Allows method chaining
 * @since `1.0.0`
 */
function append(message, options = log.options) {
	let prefix = options.state || log.options.state ? `[${options.state}] ` : "";

	prefix += options.timestamp || log.options.timestamp ? `${timestamp()} ` : "";

	prefix += options.level || log.options.level ? `${options.level}: ` : "";

	console.log(prefix + (typeof message == "string" ? message : JSON.stringify(message)));

	return log;
}

/**
 * Clear the console and write new stuff to it
 * @param {*} message Data to *write* to the console
 * @param {LogOptions} options Onetime option overrides (@see {@link log.options} for further information)
 * @returns {{
 * 	append: Function,
 * 	write: Function,
 * 	clear: Function
 * }} Allows method chaining
 * @since `1.0.0`
 */
function write(message, options = log.options) {
	return log.clear().append(message, options);
}

/**
 * Clear the console
 * @returns {{
 * 	append: Function,
 * 	write: Function,
 * 	clear: Function
 * }} Allows method chaining
 * @since `1.0.0`
 */
function clear() {
	console.clear();

	return log;
}

/**
 * Core Logger
 * @since `1.0.0`
 */
const log = {
	append: append,
	write: write,
	clear: clear,

	/**
	 * Default options.
	 * Message appearances:
	 * @example`[[(      |  OK  |FAILED)] ][HH:MM:SS ][(INFO|WARN|ERROR): ]<message>`
	 * @type {LogOptions}
	 */
	options: {
		state: undefined,
		timestamp: undefined,
		level: undefined
	}
};

module.exports = { log, LogState, LogLevel };