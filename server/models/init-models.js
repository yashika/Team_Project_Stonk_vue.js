var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _posts = require("./posts");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);

  posts.hasOne(comments, { as: "comment", foreignKey: "parentpostid"});
  comments.belongsTo(posts, { as: "parentpost", foreignKey: "parentpostid"});

  return {
    comments,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;