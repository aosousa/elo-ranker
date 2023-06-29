module.exports = function(sequelize, DataTypes) {
    const Ranking = sequelize.define('Ranking', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        ranking: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'ranking',
        timestamps: false
    })

    return Ranking;
}