module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  });

  User.associate = function (models) {
    User.hasMany(models.Alert, {
      onDelete: "cascade",
    });
  };

  return User;
};
