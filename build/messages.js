module.exports = (server) => {
  const io = require('socket.io')(server)
  let messages = []
  let users = []

  io.on('connection', socket => {
    socket.on('userLogin', user => {
      if(!users.includes(user)) {
        users.push(user)
        socket.emit('userLogin', true)
      }
      else {
        socket.emit('userLogin', false)
      }
      console.log(users)
    })
  })
}
