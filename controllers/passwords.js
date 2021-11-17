
// @desc    Get all passwords
// @route   GET /api/v1/passwords
// @access  Private
exports.getPasswords = (req, res, next) => {
  res.status(200).json( {
    success: true,
    msg: 'Show all passwords'
  });
};

// @desc    Get single password
// @route   GET /api/v1/passwords/:id
// @access  Private
exports.getPassword = (req, res, next) => {
  res.status(200).json( {
    success: true,
    msg: `Show password ${req.params.id}`
  });
};

// @desc    Create password
// @route   POST /api/v1/passwords
// @access  Private
exports.createPassword = (req, res, next) => {
  res.status(200).json( {
    success: true,
    msg: 'Create password'
  });
};

// @desc    Update password
// @route   PUT /api/v1/passwords/:id
// @access  Private
exports.updatePassword = (req, res, next) => {
  res.status(200).json( {
    success: true,
    msg: `Update password ${req.params.id}`
  });
};

// @desc    Delete password
// @route   DELETE /api/v1/passwords/:id
// @access  Private
exports.deletePassword = (req, res, next) => {
  res.status(200).json( {
    success: true,
    msg: `Delete password ${req.params.id}`
  });
};