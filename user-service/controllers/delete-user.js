const doDeleteUser = require('../business/user-delete');

exports.deleteUser = async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await doDeleteUser(userId);
      if (user) {
        res.status(200).json('User deleted.')
      } else {
        res.status(404).json({message: 'Cannot find user.'});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };