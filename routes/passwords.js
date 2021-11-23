const express = require('express');
const { getPasswords, getPassword, createPassword, updatePassword, deletePassword} = require('../controllers/passwords');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getPasswords)
  .post(protect, createPassword);

router.route('/:id')
  .get(protect, getPassword)
  .put(protect, updatePassword)
  .delete(protect, deletePassword)

module.exports = router;