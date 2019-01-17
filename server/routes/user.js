'use strict'

const userService = require('../services/user-service')

const handlers = {
  get: async (request, h) => {
    let response = await userService.get(request, h)
    return response
  },
  upsert: async (request, h) => {
    let exists = await userService.checkExists(request.payload.email)
    if (exists) {
      return h.response(Error).code(400)
    }
    return userService.upsert(request, h)
  }
}

module.exports = [{
  method: 'GET',
  path: '/user/{email}',
  options: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/user',
  options: {
    handler: handlers.upsert
  }
}
]
