'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {
        /**
         * Helper method for defining associations.
         */
        static associate(models) {
            // define association here (nếu cần liên kết với User hoặc model khác)
        }
    };
    AllCode.init({
        key: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AllCode',
    });

    return AllCode;
};