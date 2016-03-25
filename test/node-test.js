var log4js = require('../dist/cjs/logManager');

log4js.configure({
    tagLayout : '%d{MM-dd-yyyy HH:mm:ss,S} [%level] %logger:%M:%line|%message',
    appenders : [ 'consoleAppender' ],
    loggers : [ {
	    logLevel : log4js.LogLevel.INFO
    } ],
    allowAppenderInjection : true
});

var log = log4js.getLogger();

function namedFunctionLogging() {
	
	log.trace('This is a named trace message');
	log.debug('This is a named debug message');
	log.info('This is a named info message');
	log.warn('This is a named warn message');
	log.error('This is a named error message');
	
}

namedFunctionLogging();

log.trace('This is a unnamed trace message');
log.debug('This is a unnamed debug message');
log.info('This is a unnamed info message');
log.warn('This is a unnamed warn message');
log.error('This is a unnamed error message');

log.info('This is a test log with {}', 'parameters');