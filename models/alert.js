module.exports = function (sequelize, DataTypes) {
  const Alert = sequelize.define("Alert", {
    url: DataTypes.TEXT,
    imageURL: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    alerted: DataTypes.BOOLEAN,
  });

  Alert.associate = function (models) {
    Alert.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Alert;
};
