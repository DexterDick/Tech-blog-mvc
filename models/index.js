const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.belongsToMany(Blog, {
  through:{
    model: Comment,
    unique: false
  }
});

Blog.belongsToMany(User, {
  through: {
    model: Comment,
    unique: false
  } 
});

User.hasMany(Blog, {
  foreignKey: 'user_id'
});

Blog.belonngsTo(User, {
  foreignKey: 'user_id',
})

module.exports = { User, Blog, Comment };
