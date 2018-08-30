import { Appender } from '..';
import { ILogEvent } from '../log.event';
import { LogAppender } from './log.appender';

@Appender('File')
export default class FileAppender extends LogAppender {

    /**
     * Gets the name of the appender (e.g. 'console')
     * @returns {null}
     */
    public static get appenderName(): string {
        return 'File';
    }

    /**
     * Appends the log event
     * @param {ILogEvent} logEvent
     */
    public append(logEvent: ILogEvent) {
        if (logEvent.level <= this.getLogLevel()) {
            this._appendToFile(logEvent);
        }
    }

    /**
     * @private
     * @function
     *
     * @param {ILogEvent} logEvent
     */
    private _appendToFile(logEvent: ILogEvent) {
        // TODO
    }

}
