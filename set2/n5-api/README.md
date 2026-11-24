# N5 REST-style Books API

Run: `node server.js` (port 8000). Data is an in-memory array; restart resets changes.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get one book |
| POST | `/api/books` | Add a book (201) |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

POST/PUT JSON example:
```json
{"title":"Simple Baking","author":"J. Dela Cruz"}
```
Use `Content-Type: application/json`.
