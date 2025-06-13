'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
            // Ví dụ liên kết:
            // Booking.belongsTo(models.User, { foreignKey: 'doctorId', as: 'doctor' });
            // Booking.belongsTo(models.User, { foreignKey: 'patientId', as: 'patient' });
            // Booking.belongsTo(models.AllCode, { foreignKey: 'statusId', targetKey: 'key', as: 'status' });
        }
    }
    Booking.init({
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        date: DataTypes.DATEONLY,
        timeType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};