const Password = require('../models/Password');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all passwords
// @route   GET /api/v1/passwords
// @access  Private
exports.getPasswords = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Field to exclude
  const removeFields = ['select', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators like gt, gte, etc.
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Password.find(JSON.parse(queryStr));

  // Select Fields
  if(req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Password.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const passwords = await query;

  // Pagination result
  const pagination = {};

  if(endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if(startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.status(200).json({
    success: true,
    count: passwords.length,
    pagination,
    data: passwords
  })
});

// @desc    Get single password
// @route   GET /api/v1/passwords/:id
// @access  Private
exports.getPassword = asyncHandler(async (req, res, next) => {
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
});

// @desc    Create password
// @route   POST /api/v1/passwords
// @access  Private
exports.createPassword = async (req, res, next) => {
  try { 
    const password = await Password.create(req.body);

    res.status(201).json({
      success: true,
      data: password
    })
  } catch (err) {
    next(err);
  }
}

// @desc    Update password
// @route   PUT /api/v1/passwords/:id
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
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
});

// @desc    Delete password
// @route   DELETE /api/v1/passwords/:id
// @access  Private
exports.deletePassword = asyncHandler(async (req, res, next) => {
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
});