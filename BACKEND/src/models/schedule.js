'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         */
        static associate(models) {
            // define association here (ví dụ: Schedule.belongsTo(models.User, { foreignKey: 'doctorId' }))
        }
    };

    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Schedule',
    });

    return Schedule;
};