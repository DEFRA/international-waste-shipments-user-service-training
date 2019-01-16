'use strict'

const userService = require('../services/user-service')

const handlers = {
  get: async (request, h) => {
    let response = await userService.get(request, h)
    return response
  },
  upsert: async (request, h) => {
    let response
    let exists = await userService.checkExists(request.payload.email)
    if (exists) {
      response = h.response(Error).code(400)
    } else {
      response = await userService.upsert(request, h)
    }
    return response
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
