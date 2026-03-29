# Broker — Real Estate Buyer Portal

A full-stack(MERN) application real estate portal where buyers can browse properties, like them, and save favourites.

---

## Tech Stack

- **Frontend** — React, Zustand, Tailwind CSS, Axios
- **Backend** — Node.js, Express, MongoDB, Mongoose, cors
- **Auth** — JWT (stored in HTTP-only cookie)

---

## Getting Started

Open two separate terminals:

- One for the backend server
- One for the frontend application

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Example Flow

### 1. Create an Account

A new user signs up by providing:

- Full Name
- Username
- Email
- Password

> ⚠️ The username and email must be unique.  
> The system checks the database and prevents registration if they are already in use.

---

### 2. Log In

The user logs in using their username and password.  
Once logged in, they can access all protected features.

---

### 3. Like a Property

Users can click the ❤️ icon on a property to like it.  
The like count updates instantly.

---

### 4. Add to Favourites

Users can click the ⭐ icon to save a property to their favourites.  
Saved properties are visually highlighted.

---

### 5. View Favourites

Users can navigate to the **Favourites** page to see all saved properties.  
They can remove a property from favourites by clicking the ⭐ icon again.
