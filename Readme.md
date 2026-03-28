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

### 1. Sign Up

**POST** `http://localhost:5000/api/auth/signup`

```json
{
  "fullName": "Jane Smith",
  "userName": "jane_smith",
  "email": "jane@example.com",
  "password": "123456"
}
```

---

### 2. Log In

**POST** `http://localhost:5000/api/auth/login`

```json
{
  "userName": "jane_smith",
  "password": "123456"
}
```

A JWT cookie is set automatically. All protected routes use this cookie.

---

### 3. Add a Property (Postman)

**POST** `http://localhost:5000/api/properties`

```json
{
  "title": "Modern Apartment in City Center",
  "description": "A beautiful modern apartment with stunning city views.",
  "price": 250000,
  "location": "Kathmandu, Nepal",
  "propertyType": "apartment",
  "bedrooms": 3,
  "bathrooms": 2,
  "images": [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
  ]
}
```

> `propertyType` must be one of: `apartment`, `house`, `villa`, `land`

After adding, refresh the browser to see the property on the dashboard.

---

### 4. Browse Properties

Open the app in the browser. All properties are publicly visible without logging in.

---

### 5. Like a Property

Click the ❤️ icon on any property card. You must be logged in. The like count updates instantly.

---

### 6. Add to Favourites

Click the ⭐ icon on any property card. You must be logged in. The star turns blue when saved.

---

### 7. View Favourites

Navigate to the **Favourites** page from the navbar. All your starred properties appear here. Click the star again to remove a property from favourites.

---
