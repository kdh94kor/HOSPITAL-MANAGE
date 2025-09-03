const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Emp = sequelize.define('Emp', {
        empkey: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        empuid: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        emppwd: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        empnam: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        empdepcod: {
            type: DataTypes.STRING(20)
        },
        empstrdte: {
            type: DataTypes.DATE
        },
        empenddte: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'empinfo',
        timestamps: false
    });

    return Emp;
};
