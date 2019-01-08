const routes = [].concat(
  require('../routes/home'),
  require('../routes/about'),
  require('../routes/user')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
