'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Doctor_Clinic_Specialty extends Model {
        static associate(models) {
            // Ví dụ liên kết:
            // Doctor_Clinic_Specialty.belongsTo(models.User, { foreignKey: 'doctorId' });
            // Doctor_Clinic_Specialty.belongsTo(models.Clinic, { foreignKey: 'clinicId' });
            // Doctor_Clinic_Specialty.belongsTo(models.Specialty, { foreignKey: 'specialtyId' });
        }
    }

    Doctor_Clinic_Specialty.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_Clinic_Specialty',
    });

    return Doctor_Clinic_Specialty;
};