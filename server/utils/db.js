require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const { database } = keys;

const setupDB = async () => {
  console.log("se está llmando")

  try {
    await mongoose.connect(database.url, {
      useNewUrlParser: true,
    })
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
  } catch (error) {
    console.log(error);
  }
};

module.exports = setupDB;
