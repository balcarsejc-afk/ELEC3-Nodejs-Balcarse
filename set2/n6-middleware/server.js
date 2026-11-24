// Full name: JC Argel Balcarse
// Section: IV-BSIT-A
// Activity: N6 - Middleware and API Testing
// Date: 2026-11-24

const http = require('http');

const books = [
  { id: 1, title: 'The Little Garden', author: 'M. Reyes' },
  { id: 2, title: 'Space for Beginners', author: 'A. Cruz' },
  { id: 3, title: 'Everyday Cooking', author: 'L. Santos' }
];
let nextId = 4;

// 1. Custom logger middleware: logs HTTP method, URL, and date/time
function loggerMiddleware(request, response, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${request.method} ${request.url}`);
  next();
}

// 2. JSON header middleware: sets Content-Type once for API responses
function jsonHeaderMiddleware(request, response, next) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
}

function runMiddlewares(middlewares, request, response, finalHandler) {
  let index = 0;

  function next() {
    if (index < middlewares.length) {
      const current = middlewares[index++];
      current(request, response, next);
    } else {
      finalHandler(request, response);
    }
  }

  next();
}

function sendJson(response, statusCode, data) {
  response.statusCode = statusCode;
  response.end(JSON.stringify(data));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', chunk => (body += chunk));
    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('Invalid JSON body.'));
      }
    });
    request.on('error', reject);
  });
}

async function routeRequest(request, response) {
  const url = new URL(request.url, 'http://localhost:8000');
  const parts = url.pathname.split('/').filter(Boolean);

  if (parts[0] !== 'api' || parts[1] !== 'books' || parts.length > 3) {
    return sendJson(response, 404, { message: 'Route not found.' });
  }

  const id = parts[2] ? Number(parts[2]) : null;

  if (parts.length === 2 && request.method === 'GET') {
    return sendJson(response, 200, books);
  }

  if (parts.length === 3 && request.method === 'GET') {
    const book = books.find(item => item.id === id);
    return book
      ? sendJson(response, 200, book)
      : sendJson(response, 404, { message: 'Book not found.' });
  }

  if (parts.length === 2 && request.method === 'POST') {
    try {
      const data = await readBody(request);
      if (!data.title || !data.author) {
        return sendJson(response, 400, { message: 'title and author are required.' });
      }
      const book = {
        id: nextId++,
        title: String(data.title).trim(),
        author: String(data.author).trim()
      };
      books.push(book);
      return sendJson(response, 201, book);
    } catch (error) {
      return sendJson(response, 400, { message: error.message });
    }
  }

  if (parts.length === 3 && request.method === 'PUT') {
    const book = books.find(item => item.id === id);
    if (!book) {
      return sendJson(response, 404, { message: 'Book not found.' });
    }
    try {
      const data = await readBody(request);
      if (data.title) book.title = String(data.title).trim();
      if (data.author) book.author = String(data.author).trim();
      return sendJson(response, 200, book);
    } catch (error) {
      return sendJson(response, 400, { message: error.message });
    }
  }

  if (parts.length === 3 && request.method === 'DELETE') {
    const index = books.findIndex(item => item.id === id);
    if (index === -1) {
      return sendJson(response, 404, { message: 'Book not found.' });
    }
    const removed = books.splice(index, 1)[0];
    return sendJson(response, 200, { message: 'Book deleted.', book: removed });
  }

  return sendJson(response, 405, { message: 'Method not allowed.' });
}

const middlewares = [loggerMiddleware, jsonHeaderMiddleware];

const server = http.createServer((request, response) => {
  runMiddlewares(middlewares, request, response, routeRequest);
});

server.listen(8000, () => {
  console.log('N6 Books API listening at http://localhost:8000');
});