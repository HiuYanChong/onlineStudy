function init(io) {
  io.on('connection', socket => {
    const url = socket.request.headers.referer;
    const array = url.split('/');
    const lessonId = array[array.length - 1];
    socket.join(lessonId);

    socket.on('message', (user, msg) => {
      io.to(lessonId).emit('new message', user, msg);
    });

    socket.on('code', code => {
      io.to(lessonId).emit('new code', code);
    });
  });
}

module.exports = init;