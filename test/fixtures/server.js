'user strict';

const logJSON = (obj) => console.log(JSON.stringify(obj));

setInterval(() => {
  logJSON({ event: 'ops', timestamp: Date.now(), host: 'rankida.local', 'pid': 8616 });
}, 1500);

setInterval(() => logJSON({ type: 'request', path: '/hello' }), 3000);

setInterval(() => logJSON({ type: 'error', message: 'Boom!' }), 5000);

logJSON({ type: 'started', message: 'Welcome' });
