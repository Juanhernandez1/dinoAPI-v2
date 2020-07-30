function dinosaurios(Model, DataTypes, Relationships, Habitad) {
  return class dinosaurios extends Model {
    static table = "dinosaurios";
    static fields = {
      id_dino: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        length: 200,
        allowNull: false,
      },
      altura: {
        type: DataTypes.STRING,
        length: 5,
        allowNull: false,
      },
      id_abitad: Relationships.belongsTo(Habitad),
      alimento: {
        type: DataTypes.STRING,
        length: 300,
        allowNull: false,
      },
    };
  };
}

export default dinosaurios;
