var express = require('express'),
  User = require('../models/User.js'),
  router = express.Router(),
  productCtrl = require('../controllers/ProductController'),
  jwt = require('jsonwebtoken'),
  config = require('../config/Config');


//-------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', productCtrl.getProducts);
router.get('/product/getProduct/:productId', productCtrl.getProduct);
router.get(
  '/product/getProductsBelowPrice/:price',
  productCtrl.getProductsBelowPrice
);
router.post('/product/createProduct', productCtrl.createProduct);
router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);
router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);

router.get('/product/getProductsBySellerName/:sellerName', productCtrl.getProductsBySellerName);


//-------------------------------User Routes-----------------------------------

router.get('/user/getAllUsers', productCtrl.getAllUsers);
router.patch('/user/updateUser/:userId', productCtrl.updateUser);


//Returns the updated user cart
router.post('/product/addToCart/:productId', (req, res, next) => {
  let productId = req.params.productId;
  User.findByIdAndUpdate(
    req.body.id,
    {
      $push: { cartItems: productId }
    },
    { new: true }
  ).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Product added successfully.',
      data: user
    });
  });


});

router.delete('/product/deleteCart/:userID', (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.userID,
    {
      $set: { cartItems: [] }
    },
    { new: true }
  ).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Cart flushed successfully.',
      data: user.cartItems
    });
  });
});

router.delete('/product/deleteCartItem/:userID/:productID', (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.userID,
    {
      $pull: { cartItems: req.params.productID }
    },
    { new: true }
  ).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Cart updated successfully.',
      data: user.cartItems
    });
  });
});

router.get('/user/getUser/:id', (req,res,next) =>{


  User.findById(req.params.id).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'User retrieved successfully.',
      data: user
    });
  });


});


//Registeration
router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err, user) => {
    if (err) {
      if (err.code === 11000) {
        // Duplicate username
        return res.send({ success: false, message: 'User already exist!' });
      }

      return res.send({
        success: false,
        message: 'Failed to save the user: ' + err
      });
    }
    res.send({
      success: true,
      message: 'User Saved',
      user
    });
  });
});


// //Login
router.post('/login', (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  const query = { username }

  //Check the user exists
  User.findOne(query, (err, user) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'
      });
    }

    //No User match the search condition
    if (!user) {
      return res.send({
        success: false,
        message: 'Error, Invalid Username or Password'
      });
    }

    //Check if the password is correct
    user.isPasswordMatch(password, user.password, (err, isMatch) => {

      //Invalid password
      if (!isMatch) {
        return res.send({
          success: false,
          message: 'Error, Invalid Username or Password'
        });
      }

      // User is Valid

      const ONE_WEEK = 604800; // Token validtity in seconds

      // Generating the token
      const token = jwt.sign({ user }, config.SECRET, { expiresIn: ONE_WEEK });

      // User Is Valid
      // This object is just used to remove the password from the retuned fields
      let returnUser = {
        username: user.username,
        userType: user.userType,
        id: user._id
      }

      //Send the response back
      return res.send({
        success: true,
        message: 'You can login now',
        user: returnUser,
        token
      });
    });
  });
});


module.exports = router;
