const User = require('../../models/user');

module.exports = {
    search
  };

//User Find
async function search(req, res) {
    console.log(req.query)
    const query = req.query.q;
    const users = await User.find({ name: { $regex: query, $options: 'i' } });
    res.json(users);
  };