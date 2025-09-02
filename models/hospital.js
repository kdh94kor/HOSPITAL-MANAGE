const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Hospital = sequelize.define('Hospital', {
        HSPCOD: {
            type: DataTypes.STRING(40),
            primaryKey: true
        },
        HSPNAM: {
            type: DataTypes.STRING(40)
        },
        HSPSTRDTE: {
            type: DataTypes.STRING(8)
        },
        HSPENDDTE: {
            type: DataTypes.STRING(8)
        },
        HSPGRD: {
            type: DataTypes.STRING(20)
        },
        HSPIP: {
            type: DataTypes.STRING(400)
        },
        HSPPORT: {
            type: DataTypes.STRING(400)
        },
        HSPPWD: {
            type: DataTypes.STRING(2000)
        },
        HSPAUTOLIST: {
            type: DataTypes.STRING(200)
        },
        HSPMEALYON: {
            type: DataTypes.STRING(4)
        },
        HSPETC: {
            type: DataTypes.STRING(2000)
        },
        HSPPACSCO: {
            type: DataTypes.STRING(40)
        },
        HSPSMSCO: {
            type: DataTypes.STRING(40)
        },
        HSPHSTSTRDTE: {
            type: DataTypes.STRING(8)
        },
        HSPHSTENDDTE: {
            type: DataTypes.STRING(8)
        },
        HSPSEEUSEYON: {
            type: DataTypes.STRING(40)
        },
        HSPOCSVER: {
            type: DataTypes.STRING(40)
        }
    }, {
        tableName: 'Z_HspInf',
        timestamps: false // 타임스탬프 컬럼 (createdAt, updatedAt) 자동 생성을 비활성화
    });

    return Hospital;
};
