function habitad(Model, DataTypes) {
  return class habitad extends Model {
    static table = "habitad";
    static fields = {
      id_abitad: {
        type: DataTypes.STRING,
        length: 4,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        length: 100,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        length: 900,
        allowNull: false,
      },
    };
  };
}

export default habitad;
