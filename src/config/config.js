import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  mode: process.env.MODE,
  dbUrl: process.env.DB_URL,
  database: process.env.DATABASE,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPassword: process.env.NODEMAILER_PASS,
};

export default config;
