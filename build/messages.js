module.exports = (server) => {
  const io = require('socket.io')(server)
  let messages = []
  let users = []

  io.on('connection', socket => {
    // User login
    socket.on('userLogin', username => {
      const userExists = users.find((user) => {
        return user.name === username
      })
      if(userExists == undefined) {
        users.push({
          name: username,
          id: socket.id
        })
        socket.emit('userLogin', true)
      }
      else {
        socket.emit('userLogin', false)
      }
      console.log(users)
    })
    socket.on('sendMessage', data => {
      messages.push(data)
      socket.broadcast.emit('sendMessage', data)
    })
    // Socket disconnect
    socket.on('disconnect', () => {
      const userDC = users.find((user) => {
        return user.id === socket.id
      })
      const index = users.indexOf(userDC);
      if(index != -1) {
        users.splice(index, 1)
      }
    })
  })
}
