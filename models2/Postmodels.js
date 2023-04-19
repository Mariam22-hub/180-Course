
// const {User} = require("./Usermodel");
const db = require("./db");
const {DataTypes} = require("sequelize");

const Post = db.define(
  'Post', {
  
  id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
  {
    timestamps: false
  }
);

// Post.associate = (models) => {
//   Post.belongsTo(models.User, { foreignKey: 'userId' });
// };
// Post.associate = (models) => {
//     Post.belongsTo(models.User, {
//           foreignKey: 'user_id',
//           as: "user-post",
//           onDelete: 'CASCADE'
//     });
// };


// return Post;

// Post.belongsTo(User, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE'
// });

module.exports = Post;

// const db = require("./db");
// const {DataTypes} = require("sequelize");

// module.exports =  () => {
//   const Post = db.define(
//     'Post', {
      
//     title: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//       },
//     body: {
//         type: DataTypes.TEXT,
//         allowNull: false
//       },
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//     });

//     Post.associate = (models) => {
//       Post.belongsTo(models.User, {
//         foreignKey: 'userId',
//         onDelete: 'CASCADE'
//       });
//     };
  
//     // return Post;
// }