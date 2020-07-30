function sector(Model, DataTypes, Relationships, Encargado) {
  return class sector extends Model {
    static table = "sector";

    static fields = {
      id_sector: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        length: 100,
        allowNull: false,
      },
      id_encargado: Relationships.belongsTo(Encargado),
    };
  };
}

export default sector;
