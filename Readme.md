# Broker — Real Estate Buyer Portal

A full-stack real estate portal where buyers can browse properties, like them, and save favourites.

---

## Tech Stack

- **Frontend** — React, Zustand, Tailwind CSS, Axios
- **Backend** — Node.js, Express, MongoDB, Mongoose
- **Auth** — JWT (stored in HTTP-only cookie)

---

## Getting Started

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

## Example Flow

### 1. Create an Account

A new user signs up by providing:

- Full Name
- Username
- Email
- Password

---

### 2. Log In

The user logs in using their username and password.  
Once logged in, they can access all protected features.

---

### 3. Browse Properties

Users can view all available properties on the dashboard without logging in.

---

### 4. Add a Property

Logged-in users can add new properties by filling in details such as:

- Title
- Description
- Price
- Location
- Property Type (apartment, house, villa, land)
- Number of bedrooms and bathrooms
- Property images

After submission, the property appears on the dashboard.

---

### 5. Like a Property

Users can click the ❤️ icon on a property to like it.  
The like count updates instantly.

---

### 6. Add to Favourites

Users can click the ⭐ icon to save a property to their favourites.  
Saved properties are visually highlighted.

---

### 7. View Favourites

Users can navigate to the **Favourites** page to see all saved properties.  
They can remove a property from favourites by clicking the ⭐ icon again.
