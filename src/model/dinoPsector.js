function dinoPsector(Model, DataTypes, Relationships, Sector, Encargado) {
  return class dinoPsector extends Model {
    static table = "dinopsector";

    static fields = {
      id_sector: {
        type: Relationships.belongsTo(Sector),
        primaryKey: true,
      },
      id_dino: {
        type: Relationships.belongsTo(Encargado),
        primaryKey: true,
      },
    };
  };
}

export default dinoPsector;
