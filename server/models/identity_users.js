'use strict'

module.exports = (sequelize, DataTypes) => {
  const indentityUsers = sequelize.define('indentity_users', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailconfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    securitystamp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phonenumberconfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    twofactorenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    lockoutenddateutc: {
      type: DataTypes.DATE,
      allowNull: true
    },
    accessfailedcount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organisationid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    addressid: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'identity_users',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  })

  return indentityUsers
}
