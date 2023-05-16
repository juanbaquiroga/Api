import express, {json, urlencoded} from 'express';
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from 'express-handlebars'
import router from './routes/index.js';
import { middlewares } from './middlewares/index.js';
import passport from 'passport';
import session from 'express-session';
import { passportStrategies } from "./libs/passport.lib.js";
import mongoose from 'mongoose';
import { User } from './models/index.js';
import os from 'os';
import cluster from 'cluster';
import logger from './libs/logger.lib.js';
import config from './config/config.js';
import DBClientFactory from './classes/DBClientFactory.class.js';
import {Server as IOServer} from 'socket.io';
import moment from 'moment';
import { messageService } from './services/index.js';


export {
    express,
    json,
    urlencoded,
    dirname,
    fileURLToPath,
    engine,
    router,
    middlewares,
    passport,
    session,
    passportStrategies,
    mongoose,
    User,
    os,
    cluster,
    logger,
    config,
    DBClientFactory,
    IOServer,
    moment,
    join,
    path,
    messageService,
}