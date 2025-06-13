'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Doctor_Infor extends Model {
        static associate(models) {
            // Liên kết ví dụ:
            // Doctor_Infor.belongsTo(models.User, { foreignKey: 'doctorId' });
            // Doctor_Infor.belongsTo(models.AllCode, { foreignKey: 'priceId', targetKey: 'key' });
            // Doctor_Infor.belongsTo(models.AllCode, { foreignKey: 'provinceId', targetKey: 'key' });
            // Doctor_Infor.belongsTo(models.AllCode, { foreignKey: 'paymentId', targetKey: 'key' });
        }
    }

    Doctor_Infor.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_Infor',
    });

    return Doctor_Infor;
};