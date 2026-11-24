# N6 Middleware and API Testing

Run: `node server.js` (port 8000). This is the N5 books API extended with two middleware functions.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get one book |
| POST | `/api/books` | Add a book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

POST/PUT JSON:
```json
{"title":"Tiny Robots","author":"K. Lim"}
```
The logger runs first and prints method, URL and timestamp. The JSON header middleware runs next, then the route handler responds. Test all five endpoints using Postman or Thunder Client.
