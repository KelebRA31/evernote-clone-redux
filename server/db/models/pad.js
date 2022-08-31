const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Note, { foreignKey: 'pad_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Pad.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pad',
  });
  return Pad;
};
