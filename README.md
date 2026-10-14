# MERN Item Manager — Lab Test Practice

This is a practice project for a lab test that requires a React frontend, Express/Node backend, MongoDB Atlas, GitHub, and separate frontend/backend deployment.

## Project structure

- `frontend/` — React + Vite + Axios
- `backend/` — Node.js + Express + Mongoose
- Database — MongoDB Atlas

Fields: `name`, `category`, `quantity`, `price`, `description`.

## Requirements

Install a current Node.js LTS version and have a MongoDB Atlas account.

## 1. Set up MongoDB Atlas

1. Sign in to MongoDB Atlas and create a free database cluster if you do not already have one.
2. Create a database user and password.
3. Under Network Access, allow your current IP address. For a temporary lab practice only, Atlas may allow `0.0.0.0/0`; this opens network access broadly, so use a strong database password and remove broad access when no longer needed.
4. Open Connect, choose Drivers, and copy the connection string.
5. Replace the username, password, and cluster placeholder. Keep the database name `item_manager` in the URL if possible.

## 2. Run the backend

Open a terminal:

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env`. Put your real connection string in `MONGODB_URI`. Do not commit `.env` to GitHub.

Start the server:

```bash
npm run dev
```

Visit `http://localhost:5000`. You should see a JSON message that the API is running.

## 3. Run the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Copy `frontend/.env.example` to `frontend/.env`. For local use, keep:

```env
VITE_API_URL=http://localhost:5000/api
```

Start React:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## 4. Test CRUD

- Create: add an item in the form.
- Read: see items in the table.
- Update: click Edit, change a value, and save.
- Delete: click Delete and confirm.

You can also test the backend using Postman or Thunder Client.

## 5. Push to a public GitHub repository

From the project root:

```bash
git init
git add .
git commit -m "Complete MERN Item Manager"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Create an empty public repository on GitHub first. Replace the URL with your own repository URL. Check that `.env` files and passwords are not uploaded.

## 6. Deploy backend (example: Render)

1. Push the project to GitHub.
2. Create a new Web Service on Render and connect the repository.
3. Set the Root Directory to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `MONGODB_URI` = your Atlas connection string
   - `CLIENT_URL` = your deployed frontend URL (after deploying frontend; you can update this later)
7. Deploy, then open the backend service URL. It should return `{"message":"Item Manager API is running"}`.

Free hosting provider options and dashboard labels can change; follow the provider's current interface.

## 7. Deploy frontend (example: Vercel or Netlify)

1. Import the same GitHub repository.
2. Set the Root Directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` = `https://YOUR-BACKEND-SERVICE-URL/api`
6. Deploy the frontend.
7. Copy the deployed frontend URL and set it as `CLIENT_URL` in the backend host's environment variables. If you use multiple frontend URLs, separate them with commas.
8. Redeploy/restart the backend if required.

**Important:** `VITE_API_URL` must point to the deployed backend, not `localhost`. Frontend environment variables are included in the built frontend, so rebuild/redeploy after changing them.

## API routes

| Method | URL | Purpose |
|---|---|---|
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get one item |
| POST | `/api/items` | Create an item |
| PUT | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |

Example JSON for POST:

```json
{
  "name": "Keyboard",
  "category": "Electronics",
  "quantity": 5,
  "price": 4500,
  "description": "Wireless keyboard"
}
```

## Common errors

- **MongoDB connection error:** check the connection string, database username/password, and Atlas Network Access.
- **Frontend cannot load items:** check that backend is running and `VITE_API_URL` ends in `/api`.
- **CORS error after deployment:** set backend `CLIENT_URL` to the exact frontend origin, including `https://`, then restart/redeploy backend.
- **Works locally but not online:** confirm both services are deployed and their environment variables are set on the hosting dashboards.
- **Changes to `.env` do not apply:** restart the local server or redeploy the frontend/backend after changing hosted environment variables.
