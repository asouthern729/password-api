const express = require('express');
const { getPasswords, getPassword, createPassword, updatePassword, deletePassword} = require('../controllers/passwords');

const router = express.Router();

router.route('/')
  .get(getPasswords)
  .post(createPassword);

router.route('/:id')
  .get(getPassword)
  .put(updatePassword)
  .delete(deletePassword)

module.exports = router;