const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Password = require('./models/Password');

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Read JSON files
const passwords = JSON.parse(fs.readFileSync(`${__dirname}/_data/pass.json`, 'utf-8'));

// Import into database
const importData = async () => {
  try {
    await Password.create(passwords);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Delete data from database
const deleteData = async () => {
  try {
    await Password.deleteMany();

    console.log('Data Detroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

if(process.argv[2] === '-i') {
  importData();
} else if(process.argv[2] === '-d') {
  deleteData();
}