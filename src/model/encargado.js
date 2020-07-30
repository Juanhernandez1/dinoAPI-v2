function encargado(Model, DataTypes) {
  return class encargado extends Model {
    static table = "encargado";
    static timestamp = false;
    static fields = {
      id_encargado: {
        type: DataTypes.STRING,
        length: 6,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        length: 60,
        allowNull: false,
      },
      usuario: {
        type: DataTypes.STRING,
        length: 60,
        allowNull: false,
      },
      clave: {
        type: DataTypes.STRING,
        length: 200,
        allowNull: false,
      },
    };
  };
}

export default encargado;
