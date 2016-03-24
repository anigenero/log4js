/**
 * log4js <https://github.com/anigenero/log4js>
 *
 * Copyright 2016-present Robin Schultz <http://cunae.com>
 * Released under the MIT License
 */

import * as logLevel from '../const/logLevel';

export function Logger(context, appenderObj) {

	/** @typeof {number} */
	let relative_ = (new Date()).getTime();
	/** @typeof {number} */
	let logSequence_ = 1;

	/**
	 * @function
	 *
	 * @param {function} func
	 *
	 * @return {string}
	 */
	function getFunctionName_(func) {

		if (typeof func !== 'function') {
			return 'anonymous';
		}

		let functionName = func.toString();
		functionName = functionName.substring('function '.length);
		functionName = functionName.substring(0, functionName.indexOf('('));

		return (functionName !== '') ? functionName : 'anonymous';

	}

	// Get the context
	if (typeof context != 'string') {

		if (typeof context == 'function') {
			context = getFunctionName_(context);
		} else if (typeof context == 'object') {
			context = getFunctionName_(context.constructor);
			if (context == 'Object') {
				context = 'anonymous';
			}
		} else {
			context = 'anonymous';
		}

	}

	/** @type {string} */
	let logContext_ = context;

	/**
	 * Logs an error event
	 */
	this.error = function() {
		appenderObj.append(constructLogEvent_(logLevel.ERROR, arguments));
	};

	/**
	 * Logs a warning
	 */
	this.warn = function() {
		appenderObj.append(constructLogEvent_(logLevel.WARN, arguments));
	};

	/**
	 * Logs an info level event
	 */
	this.info = function() {
		appenderObj.append(constructLogEvent_(logLevel.INFO, arguments));
	};

	/**
	 * Logs a debug event
	 */
	this.debug = function() {
		appenderObj.append(constructLogEvent_(logLevel.DEBUG, arguments));
	};

	/**
	 * Logs a trace event
	 */
	this.trace = function() {
		appenderObj.append(constructLogEvent_(logLevel.TRACE, arguments));
	};

	/**
	 * @function
	 *
	 * @param {number} level
	 * @param {Array} arguments
	 *
	 * @return {LOG_EVENT}
	 */
	function constructLogEvent_(level, args) {

		let error = new Error();

		let details = getFileDetails_(error);
		let loggingEvent = {
			error : null,
			file : details.filename,
			level : level,
			lineNumber : details.line,
			logger : logContext_,
			message : '',
			method : getFunctionName_(args.callee.caller),
			properties : undefined,
			relative : (new Date()).getTime() - relative_,
			sequence : logSequence_++
		};

		let messageStubs = 0;
		for (let i = 0; i < args.length; i++) {

			if (i === 0) {
				loggingEvent.message = args[i];
				messageStubs = (/\{\}/g).exec(loggingEvent.message).length;
			} else if (messageStubs > 0) {
				loggingEvent.message = loggingEvent.message.replace(/\{\}/, args[i]);
				messageStubs--;
			} else if (args[i] instanceof Error) {
				loggingEvent.error = args[i];
			} else {
				loggingEvent.properties = args[i];
			}

		}

		return loggingEvent;

	}

	function getFileDetails_(error) {

		let details = {
			column : '?',
			filename : 'anonymous',
			line : '?'
		};
		if (error.stack != undefined) {

			let parts = error.stack.split(/\n/g);
			let file = parts[3];
			file = file.replace(/at (.*\(|)(file|http|https|)(\:|)(\/|)*/, '');
			file = file.replace(')', '');
			file = file.replace((typeof location !== 'undefined') ? location.host : '', '').trim();

			let fileParts = file.split(/\:/g);

			details.column = fileParts.pop();
			details.line = fileParts.pop();

			if (typeof define !== 'undefined') {
				let path = require('path');
				let appDir = path.dirname(require.main.filename);
				details.filename = fileParts.join(':').replace(appDir, '').replace(/(\\|\/)/, '');
			} else {
				details.filename = fileParts.join(':');
			}

			return details;

		}
		return 'unknown';
	}

	return this;

}
