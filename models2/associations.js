const { User } = require('../models2/Usermodel.js');
const {Post} = require("./Postmodels");

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

