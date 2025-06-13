'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        static associate(models) {
            // Liên kết ví dụ:
            // Markdown.belongsTo(models.User, { foreignKey: 'doctorId' });
            // Markdown.belongsTo(models.Clinic, { foreignKey: 'clinicId' });
            // Markdown.belongsTo(models.Specialty, { foreignKey: 'specialtyId' });
        }
    }

    Markdown.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Markdown',
    });

    return Markdown;
};