const express = require("express");
const router = express.Router();
const User = require("../models/User");
var bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser");
 const JWT_SECRET='shyamjiisagoodboy'

 router.post(
    '/register',
    body('username').isLength({ min: 5 }),
    body('password').isLength({ min: 8 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

     // Hash the password before storing it in the database
     const hashedPassword = await bcrypt.hash(password, 10);

     const user = new User({ username, password: hashedPassword });
     await user.save();
 
     res.json({ message: 'User registered successfully' });
   }
 );


 router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    // Create and send the JWT token as the login is successful
    const token = jwt.sign({ id: user._id }, secretKey);
    res.json({ token });
  });

//   // Documentation with Swagger
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'My API Documentation',
//       version: '1.0.0',
//       description: 'API documentation for My App',
//     },
//     basePath: '/',
//   },
//   apis: ['app.js'],
// };


// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
module.exports = router;