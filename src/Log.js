// @ts-check

/**
 * Implemented states for the logger
 * @see {@link LogOptions} for further information
 * @since `1.0.0`
 * @typedef { "      " | "  OK  " | "FAILED" } LogState
 */
// type LogState = "      " | "  OK  " | "FAILED";

/**
 * Implemented levels for the logger
 * @see {@link LogOptions} for further information
 * @since `1.0.0`
 * @typedef { "INFO" | "WARN" | "ERROR" } LogLevel
 */
// type LogLevel = "INFO" | "WARN" | "ERROR";

/**
 * Implemented options for the logger
 * @since `1.0.0`
 * @typedef {{
 * 	state?: LogState,
 * 	timestamp?: boolean,
 * 	level?: LogLevel
 * }} LogOptions
 */
// type LogOptions = {
// 	state?: LogState,
// 	timestamp?: boolean,
// 	level?: LogLevel
// };

/**
 * The core logger
 * @see {@link LogOptions} for further information
 * @since `1.0.0`
 * @typedef {{
 * 	options: LogOptions,
 * 	append: Function,
 * 	write: Function,
 * 	clear: Function
 * }} Log
 */
// type Log = {
// 	options: LogOptions,
// 	append: Function,
// 	write: Function,
// 	clear: Function
// };

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

	return `${digitPair(time, 24)}:${minutes}:${seconds}`;
}

module.exports = {
	/**
	 * Default options.
	 * Message appearances:
	 * @example`[[(      |  OK  |FAILED)] ][HH:MM:SS ][(INFO|WARN|ERROR): ]<message>`
	 * @type {LogOptions}
	 */
	options: {},

	/**
	 * Write new stuff to console
	 * @param {*} message Data to *append* to the console
	 * @param {LogOptions} options Onetime option overrides (@see {@link LogOptions} for further information)
	 * @returns {Log} Allows method chaining
	 * @since `1.0.0`
	 */
	// append: function (message: any, options: LogOptions = this.options): Log {
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

	/**
	 * Clear the console and write new stuff to it
	 * @param {*} message Data to *write* to the console
	 * @param {LogOptions} options Onetime option overrides (@see {@link log.options} for further information)
	 * @returns {Log} Allows method chaining
	 * @since `1.0.0`
	 */
	// write: function (message: any, options: LogOptions = this.options): Log {
	write: function (message, options = {}) {
		return this.clear().append(message, options);
	},

	/**
	 * Clear the console
	 * @returns {Log} Allows method chaining
	 * @since `1.0.0`
	 */
	// clear: function (): Log {
	clear: function () {
		console.clear();

		return this;
	}
};