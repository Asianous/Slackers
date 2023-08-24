const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken,
  changePassword
};

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

async function changePassword(req, res) {
  const userId = req.user._id
  console.log(userId)
  try {
    const { userId, oldPassword, newPassword } = req.body;
    console.log('oldPassword: ', oldPassword)
    console.log('newPassword: ', newPassword)
    // Get the user from the database
    const user = await User.findById(req.user._id);
console.log(user)
    // Check if the old password matches
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid old password');
    }

    // Hash the new password
    // const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    // await User.Update({ _id: userId },  { password: newPassword } ,{new:true});
    user.password = newPassword
    await user.save()
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'An error occurred' });
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}