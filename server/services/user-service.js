const models = require('../models')
const uuid = require('uuid')

const STATUS_CREATED = 201
const STATUS_OK = 200
const STATUS_NOT_FOUND = 404

let users = {}

module.exports = {
  get: async function (request, h) {
    try {
      let responseCode
      const user = await models.identity_users.findAll({
        where: {
          email: request.params.email
        }
      })
      responseCode = !Object.keys(user).length ? STATUS_NOT_FOUND : STATUS_OK
      return h.response(user).code(responseCode)
    } catch (err) {
      console.log(err)
      return h.response(Error).code(500)
    }
  },
  upsert: async function (request, h) {
    try {
      let responseCode
      if (request.payload.id === undefined) {
        const id = this.generateId()
        request.payload.id = id
        users[id] = request.payload
      }

      const [user, created] = await models.identity_users.upsert({
        id: request.payload.id,
        email: request.payload.email,
        emailconfirmed: false,
        passwordhash: request.payload.password,
        phonenumber: request.payload.telephoneNumber,
        phonenumberconfirmed: false,
        username: request.payload.email,
        firstName: request.payload.firstName,
        surname: request.payload.lastName,
        twofactorenabled: false,
        lockoutenabled: false,
        accessfailedcount: 0
      },
      {
        returning: true
      })
      responseCode = created ? STATUS_CREATED : STATUS_OK
      return h.response(user).code(responseCode)
    } catch (err) {
      console.log(err)
      return h.response(Error).code(500)
    }
  },
  generateId: function () {
    return uuid.v4()
  },
  checkExists: async function (email) {
    try {
      const user = await models.identity_users.findAll({
        where: {
          email: email
        }
      })
      if (user.length > 0) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.log(err)
      return true
    }
  }
}
