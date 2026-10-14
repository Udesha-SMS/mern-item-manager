# Backend

## Setup
1. Install Node.js.
2. Open a terminal in the `backend` folder.
3. Run `npm install`.
4. Copy `.env.example` to a new file named `.env`.
5. Replace `MONGODB_URI` with your MongoDB Atlas connection string.
6. Run `npm run dev`.

The API should start at `http://localhost:5000`.

## Routes
- `GET /` - check whether the API is running
- `GET /api/items` - list items
- `GET /api/items/:id` - get one item
- `POST /api/items` - create an item
- `PUT /api/items/:id` - update an item
- `DELETE /api/items/:id` - delete an item

Example POST body:
{
  "name": "Keyboard",
  "category": "Electronics",
  "quantity": 5,
  "price": 4500,
  "description": "Wireless keyboard"
}
