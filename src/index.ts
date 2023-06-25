import * as log4js from 'log4js';
import * as mongodb from 'mongodb';
import { getMongoCollection } from './get-mongo-collection';
import { IMongoAppenderConfiguration } from './types/types';

/** @description local variable to save connection to database */
let dbConnection: mongodb.Collection;

/**
 * Exported configuration function to init appender
 *
 * @param {IMongoAppenderConfiguration} config Configuration for mongo
 * @param {log4js.LayoutsParam} layouts log4js layouts collection
 */
export const configure = (
    config: IMongoAppenderConfiguration,
    layouts: log4js.LayoutsParam | undefined,
    findAppender?: () => log4js.AppenderFunction,
    levels?: log4js.Levels
) => {
    return Log(config, layouts, findAppender, levels);
};

/**
 * @description Exported AppenderModule function to init
 *
 * @export
 * @param {RestAppenderConfig} config Configuration for mongo
 * @returns
 */
export const MongoDbAppender: log4js.AppenderModule = {
    configure: configure,
};

/**
 * @description Base appender function
 *
 * @param {IMongoAppenderConfiguration} config Configuration for mongo
 * @param {log4js.LayoutsParam} layouts log4js layouts collection
 * @return {*}
 */
function Log(
    config: IMongoAppenderConfiguration,
    layouts: log4js.LayoutsParam | undefined,
    findAppender?: () => log4js.AppenderFunction,
    levels?: log4js.Levels
) {
    findAppender = findAppender;
    levels = levels;

    let layout: log4js.LayoutFunction | undefined = undefined;
    if (config.layout) {
        if (layouts) {
            layout = layouts.layout(config.layout.type, config.layout as any);
        }
    }

    return (loggingEvent: any) => {
        let logData = loggingEvent;

        if (layout) {
            logData = layout(logData);
        }

        (async () => {
            try {
                dbConnection = await getMongoCollection(dbConnection, config);
                const result = await dbConnection.insertOne(logData);
                if (config.consoleLog) {
                    console.debug(result);
                }
            } catch (err) {
                const logError = {
                    message:
                        'Log4JsJsMongodb : Error get connect to mongo / inserting log data.',
                    error: err,
                    detailInfo: {
                        logPrefix: `${__filename}[${Log.name}]`,
                    },
                };

                console.error(logError); //Write the error in to console (as well as log pm2 log)
            }
        })();
    };
}
