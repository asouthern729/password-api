const Password = require('../models/Password');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all passwords
// @route   GET /api/v1/passwords
// @access  Private
exports.getPasswords = async (req, res, next) => {
  const passwords = await Password.find();

  res.status(200).json({
    success: true,
    count: passwords.length,
    data: passwords
  })
};

// @desc    Get single password
// @route   GET /api/v1/passwords/:id
// @access  Private
exports.getPassword = async (req, res, next) => {
  try { 
    const password = await Password.findById(req.params.id);
    
    if(!password) {
      return next(
        new ErrorResponse(`Password not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json( {
      success: true,
      data: password
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create password
// @route   POST /api/v1/passwords
// @access  Private
exports.createPassword = async (req, res, next) => {
  const password = await Password.create(req.body);

  res.status(201).json({
    success: true,
    data: password
  });
};

// @desc    Update password
// @route   PUT /api/v1/passwords/:id
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try { 
    const password = await Password.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!password) {
      return next(
        new ErrorResponse(`Password not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ 
      success: true,
      data: password
    });
  } catch (err) {
    next(err);
  }
  };

// @desc    Delete password
// @route   DELETE /api/v1/passwords/:id
// @access  Private
exports.deletePassword = async (req, res, next) => {
  try {
    const password = await Password.findByIdAndDelete(req.params.id);

    if(!password) {
      return next(
        new ErrorResponse(`Password not found with id of ${req.params.id}`, 404)
      );
    };

    res.status(200).json({ 
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};