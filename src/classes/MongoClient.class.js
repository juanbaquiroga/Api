import mongoose from "mongoose";
import config from "../config/config.js";
import CustomError from "./CustomError.class.js";
import DBClient from "./DBClient.class.js";
import { logger } from "../imports.js";

export default class MongoClient extends DBClient {
  constructor() {
    super();
    this.client = mongoose;
  }

  async connect() {
    try {
      await this.client.connect(config.dbUrl);
      logger.info("Database connecetd!")
    } catch (err) {
      throw new CustomError(500, "Error connecting to the database");
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();
      logger.info("Database disconnected!")
    } catch (err) {
      throw new CustomError(500, "Error disconnecting database");
    }
  }
}
