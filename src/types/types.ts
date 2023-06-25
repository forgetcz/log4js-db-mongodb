import { IJsonLayoutConfig } from 'log4js-layouts/dist/types/types.js';
import * as mongodb from 'mongodb';

/**
 * @deprecated use IMongoAppenderConfiguration instead of MongoAppenderConfiguration
 *
 * @export
 * @interface MongoAppenderConfiguration
 * @extends {IMongoAppenderConfiguration}
 */
export interface MongoAppenderConfiguration extends IMongoAppenderConfiguration {}

/**
 * @description Mongo configuration definition
 *
 * @export
 * @interface MongoAppenderConfiguration
 */
export interface IMongoAppenderConfiguration {
    /**
     * @description Log4js type : '@onio/log4js-mongodb' (live) /  'log4js-db-mongodb' dev
     *   This MUST be the exact match with package.json : "name": "log4js-db-mongodb"
    */
    type: 'log4js-db-mongodb';
    /** Parent connection to mongoDb or connection properties to mongoDb */
    mongoSetting: IMongoClient | IMongoDefinition;
    /** @description Layout definition */
    layout: IJsonLayoutConfig;
    /** @description ude console log */
    consoleLog?: boolean;
}

/**
 * @description Mongo connection with the database and collection
 *
 * @export
 * @interface IMongoClient
 */
export interface IMongoClient {
    /** @description Mongo client for access to db */
    client: mongodb.MongoClient;
    /** @description Mongo database to write */
    database: string;
    /** @description Mongo collection to write */
    collection: string;
}

/**
 * @description Mongo connection definition
 *
 * @export
 * @interface IMongoDefinition
 */
export interface IMongoDefinition {
    /** @description Mongo connection string: MONGO_URL="mongodb://127.0.0.1:27017/is_adapter" */
    url: string;
    /** @description Mongo settings */
    options: mongodb.MongoClientOptions;
    /** @description Mongo database to write */
    database: string;
    /** @description Mongo collection to write */
    collection: string;
    /** @description Mongo debug level */
    /** @deprecated not used any more... */
    logLevel?: any;
}