export const Test = sequelize.define('test', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  questions: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  completedByUsers: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});