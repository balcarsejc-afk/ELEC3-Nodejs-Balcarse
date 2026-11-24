// Full name: JC Argel Balcarse
// Section: IV-BSIT-A
// Activity: N4 - Basic HTTP Server
// Date: 2026-11-19

const http = require('http');

const server = http.createServer((request, response) => {
  // URL ang basehan kung anong page ang ibabalik.
  if (request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end('<h1>Welcome, JC Argel Balcarse</h1><p>Section: IV-BSIT-A</p>');
  } else if (request.url === '/about') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end('<h1>About Me</h1><p>I am an IT student learning Python and Node.js.</p>');
  } else if (request.url === '/contact') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end('<h1>Contact</h1><p>School activity contact page.</p>');
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Page not found');
  }
});

server.listen(8000, () => {
  console.log('N4 server running at http://localhost:8000');
  console.log('Student: JC Argel Balcarse | Section: IV-BSIT-A');
});
