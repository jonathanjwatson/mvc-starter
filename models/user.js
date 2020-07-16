module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("user", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  });
  return User;
};
