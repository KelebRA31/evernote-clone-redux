const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Pad, { foreignKey: 'pad_id' });
    }
  }
  Note.init({
    text: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    pad_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};
