// models/user.js

const db = require("./db");
const {Post} = require("./Postmodels");
const {DataTypes} = require("sequelize");

 
  const User = db.define(
      'User', {
      
      username: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      role: {
        type: DataTypes.ENUM('basic', 'premium', 'admin'),
        allowNull: false
      }
      
    },
    {
      timestamps: false
    }
      
    );
    
    // User.associate = (models) => {
    //   User.hasMany(models.Post, { foreignKey: 'userId' });
    // };

    // User.associate = (models) => {
    //   User.hasMany(models.Post, {
    //     foreignKey: 'user_id',
    //     as: 'posts'
    //   });
    // };
    // return User;

    // User.hasMany(Post);
  
  module.exports = User;
  
  