export default async function websocketRoutes(app, options) {
    app.get('/', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
        connection.socket.on('message', message => {
            // message.toString() === 'hi from client'
            connection.socket.send('hi from server')
        })
    })

}