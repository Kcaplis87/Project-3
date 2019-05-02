
// used to encrypt password
const bcrypt = require('bcryptjs');
// help generate web token for user sign in
const jwt = require('jsonwebtoken');

// connect to models db
const User = require('../../models/user');
  
module.exports = {
    // user sign UP function
    createUser: async args => {
      try {
        const existingUser = await User.findOne({ email: args.userInput.email });
        if (existingUser) {
          throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
  
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
  
        const result = await user.save();
  
        return { ...result._doc, password: null, _id: result.id };
      } catch (err) {
        throw err;
      }
    },
    //user log IN function
    login: async ({ email, password }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error('User does not exist!');
      }
      // compare user password to hashed password in db
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Password is incorrect!');
      }
      // creates token and validates token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'somesupersecretkey',
        {
          expiresIn: '1h'
        }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    }
  };
  