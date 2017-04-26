const formatter = require('../../build/es6/formatter').Formatter;
const assert = require('assert');

describe('message', function () {

    const testMessage = 'This is a test message';

    let testMessageOutput = function (loggerTag) {
        assert.equal(formatter.format(loggerTag, { message : testMessage }), testMessage);
    };

    it('%m', function () {
        testMessageOutput('%m');
    });

    it('%msg', function () {
        testMessageOutput('%msg');
    });

    it('%message', function () {
        testMessageOutput('%message');
    });

});