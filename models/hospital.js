const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Hospital = sequelize.define('Hospital', {
        hspcod: {
            type: DataTypes.STRING(40),
            primaryKey: true
        },
        hspnam: {
            type: DataTypes.STRING(40)
        },
        hspstrdte: {
            type: DataTypes.STRING(8)
        },
        hspenddte: {
            type: DataTypes.STRING(8)
        },
        hspgrd: {
            type: DataTypes.STRING(20)
        },
        hspip: {
            type: DataTypes.STRING(400)
        },
        hspport: {
            type: DataTypes.STRING(400)
        },
        hsppwd: {
            type: DataTypes.STRING(2000)
        },
        hspautolist: {
            type: DataTypes.STRING(200)
        },
        hspmealyon: {
            type: DataTypes.STRING(4)
        },
        hspetc: {
            type: DataTypes.STRING(2000)
        },
        hsppacsco: {
            type: DataTypes.STRING(40)
        },
        hspsmsco: {
            type: DataTypes.STRING(40)
        },
        hsphststrdte: {
            type: DataTypes.STRING(8)
        },
        hsphstenddte: {
            type: DataTypes.STRING(8)
        },
        hspseeuseyon: {
            type: DataTypes.STRING(40)
        },
        hspocsver: {
            type: DataTypes.STRING(40)
        }
    }, {
        tableName: 'hspinfo',
        timestamps: false
    });

    return Hospital;
};