/**
 * Implemented states for the logger
 * @see {@link Log.options} for further information
 * @since `1.0.0`
 * @enum {string}
 */
const LogState = {
	/**
	 * Don't show state
	 * @since `1.0.0`
	 */
	NONE: "",

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
 * @see {@link Log.options} for further information
 * @since `1.0.0`
 * @enum {string}
 */
const LogLevel = {
	/**
	 * Don't use levels
	 * @since `1.0.0`
	 */
	NONE: "",

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

class LogOptions {
	/**
	 * @private Internal
	 * @param {LogState} state
	 * @param {boolean} timestamp
	 * @param {LogLevel} level
	 */
	constructor(state = Log.options.state, timestamp = Log.options.timestamp, level = Log.options.level) {
		this.state = state;
		this.timestamp = timestamp;
		this.level = level;
	}
}

/**
 * @private Internal
 * @param {number} number
 * @param {number} base
 * @returns {string}
 */
function digitPair(number, base) {
	const string = (Math.floor(number) % base).toString();

	return string.length == 1 ? `0${string}` : string;
}

/**
 * @private Internal
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
 * @param {LogOptions} options Onetime option overrides (@see {@link Log.options} for further information)
 * @returns {Log} `Log` Allows method chaining
 * @since `1.0.0`
 */
function append(message, options = {}) {
	options = new LogOptions(options.state, options.timestamp, options.level);

	let prefix = options.state ? `[${options.state}] ` : "";

	prefix += options.timestamp ? `${timestamp()} ` : "";

	prefix += options.level ? `${options.level}: ` : "";

	console.log(prefix + (typeof message == "string" ? message : JSON.stringify(message)));

	return Log;
}

/**
 * Clear the console and write new stuff to it
 * @param {*} message Data to *write* to the console
 * @param {LogOptions} options Onetime option overrides (@see {@link Log.options} for further information)
 * @returns {Log} `Log` Allows method chaining
 * @since `1.0.0`
 */
function write(message, options = {}) {
	console.clear();

	return append(message, options);
}

/**
 * Clear the console
 * @returns {Log} `Log` Allows method chaining
 * @since `1.0.0`
 */
function clear() {
	console.clear();

	return Log;
}

/**
 * Core Logger
 * @since `1.0.0`
 * @enum {Function|LogOptions}
 */
const Log = {
	append: append,
	write: write,
	clear: clear,

	/**
	 * Default options.
	 * Message appearances:
	 * @template `[[(      |  OK  |FAILED)] ][HH:MM:SS ][(INFO|WARN|ERROR): ]<message>`
	 * @see {@link LogState}
	 * @see {@link LogLevel}
	 */
	options: {
		state: LogState.NONE,
		timestamp: false,
		level: LogLevel.NONE
	}
}

module.exports = { Log, LogState, LogLevel };
