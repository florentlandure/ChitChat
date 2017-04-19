module.exports = (server) => {
  const io = require('socket.io')(server)
  let channels = {
    'General': {
      name: 'General',
      members: [],
      messages: []
    },
    'Gaming': {
      name: 'Gaming',
      members: [],
      messages: []
    }
  }
  let users = []
  io.on('connection', socket => {
    // User login
    socket.on('userLogin', username => {
      const userExists = users.findIndex(user => {
        return user.name === username
      })
      if(userExists === -1) {
        users.push({
          name: username,
          id: socket.id
        })
        socket.emit('userLoggedIn', true)
      }
      else {
        socket.emit('userLoggedIn', false)
      }
    })
    // User sends a message
    socket.on('sendMessage', data => {
      if(channels[data.channel].messages.length > 100) {
        channels[data.channel].messages.splice(0, 1)
      }
      channels[data.channel].messages.push({user: data.user, content: data.content})
    })
    // Send the messages of a channel
    socket.on('getMessages', chan => {
      socket.emit('castMessages', channels[chan].messages)
    })
    // Add a user to a channel
    socket.on('addMemberToChannel', data => {
      if(!channels[data.channel].members.includes(data.user)) {
        channels[data.channel].members.push(data.user)
      }
    })
    // Send channel members to all clients
    socket.on('getChannelMembers', chan => {
      socket.emit('channelMembers', channels[chan].members)
    })
    // Socket disconnect
    socket.on('disconnect', () => {
      const userDC = users.find((user) => {
        return user.id === socket.id
      })
      if(userDC !== undefined) {
        const index = users.indexOf(userDC);
        if(index != -1) {
          users.splice(index, 1)
        }
        const channelKeys = Object.keys(channels)
        channelKeys.forEach(k => {
          const idx = channels[k].members.findIndex(m => {
            return m === userDC.name
          })
          console.log(userDC, channels[k].members, idx)
          if(idx > -1) {
            channels[k].members.splice(idx, 1)
          }
        })
      }
    })
  })
}
