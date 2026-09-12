# Pixel Market Frontend

📌 Description

Frontend application for **Pixel Market**, a full-stack video game e-commerce project.

The application provides a responsive user interface for browsing products, viewing product details, managing a shopping cart and wishlist, publishing product reviews, and completing a simulated checkout.

It also includes authentication, role-based access control, protected routes, and an administration panel for product management.

The frontend consumes the Pixel Market REST API and uses cookie-based JWT authentication.

---

## 🚀 Demo

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api`
- Swagger UI: `http://localhost:3000/api/docs`

---

## 🛠️ Technologies

- React
- Vite
- JavaScript (ES Modules)
- React Router DOM
- Redux Toolkit
- Axios
- CSS Modules
- pnpm
- REST API integration
- JWT authentication using HTTP-only cookies

---

## ✨ Features

### Authentication

- User registration
- User login
- User logout
- Persistent authentication using cookies
- Authenticated user profile
- Protected routes
- Role-based access control
- Administrator-only routes

### Products

- Product catalog
- Product detail page
- Product images
- Product price and stock information
- Responsive product cards
- Product availability validation

### Shopping Cart

- Add products to cart
- Display cart items
- Product quantity information
- Calculate product subtotals
- Calculate order total
- Simulated checkout
- Checkout success page

### Wishlist

- Add products to wishlist
- View saved products
- Remove products from wishlist
- Wishlist counter in the navigation bar

### Reviews

- Publish a review for a product
- 1–5 star rating system
- Product comments
- Display the authenticated user's review

### Administration

Administrators have access to a protected management panel that allows them to:

- View the product catalog
- Create products
- Upload product images
- Edit products
- Delete products
- Manage price and stock

### User Interface

- Responsive layout
- Dark gaming-inspired design
- Blue and cyan visual theme
- Responsive navigation bar
- Shopping cart and wishlist counters
- Loading and error states
- Custom 404 page
- Mobile-friendly layouts

---

## 📂 Project Structure

```text
pixel-market-frontend/

├── public/
│
├── src/
│   ├── api/
│   │   ├── auth.js
│   │   ├── axios.js
│   │   ├── cart.js
│   │   ├── products.js
│   │   ├── reviews.js
│   │   └── wishlist.js
│   │
│   ├── components/
│   │   ├── CartItem/
│   │   ├── CartSummary/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── ProductCard/
│   │   ├── ProductForm/
│   │   ├── ReviewsSection/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── AdminPage/
│   │   ├── CartPage/
│   │   ├── CheckoutSuccessPage/
│   │   ├── HomePage/
│   │   ├── LoginPage/
│   │   ├── NotFoundPage/
│   │   ├── ProductDetailPage/
│   │   ├── ProductsPage/
│   │   ├── RegisterPage/
│   │   ├── WishlistPage/
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── AdminRoute.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── store/
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   ├── productsSlice.js
│   │   ├── wishlistSlice.js
│   │   └── store.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/antony-s17/ecommerce-frontend.git

cd ecommerce-frontend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

The URL must point to the Pixel Market backend API.

---

## ▶️ Run in Development

Start the development server:

```bash
pnpm dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 🏗️ Build

Create a production build:

```bash
pnpm build
```

The generated production files will be stored in:

```text
dist/
```

To preview the production build locally:

```bash
pnpm preview
```

---

## 🔐 Authentication

Pixel Market uses JWT authentication managed by the backend.

The authentication token is stored in an HTTP-only cookie. Axios is configured to send credentials automatically:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
```

After login, the application retrieves the authenticated user's profile to restore the user information and role in Redux.

Authentication state contains information such as:

```text
user
isAuthenticated
loading
error
```

Protected pages require an authenticated session.

Administrator pages additionally require:

```text
role: ADMIN
```

---

## 👤 Demo Credentials

To test administrator features, use the following demo account:

- **Email:** `admin@gmail.com`
- **Password:** `admin123`

These credentials are provided for evaluation purposes only.

---

## 🧭 Main Routes

| Route | Description | Access |
|---|---|---|
| `/` | Home page | Public |
| `/products` | Product catalog | Public |
| `/product/:id` | Product details | Public |
| `/login` | User login | Public |
| `/register` | User registration | Public |
| `/wishlist` | User wishlist | Authenticated |
| `/cart` | Shopping cart | Authenticated |
| `/checkout/success` | Checkout confirmation | Authenticated |
| `/admin` | Product administration | ADMIN |
| `*` | 404 page | Public |

---

## 🔌 API Integration

All requests are handled through a centralized Axios instance:

```text
src/api/axios.js
```

The application communicates with the following backend resources:

```text
/api/auth
/api/user
/api/product
/api/cart
/api/wishlist
```

Product reviews are handled as nested product resources:

```text
/api/product/{productId}/reviews
```

---

## 🛒 Shopping Cart Flow

The shopping cart is managed globally using Redux Toolkit.

The general flow is:

```text
Product Detail
      ↓
Add to Cart
      ↓
Redux Async Thunk
      ↓
POST /api/cart
      ↓
Refresh Cart
      ↓
Cart Page
      ↓
Checkout
      ↓
POST /api/cart/checkout
      ↓
Checkout Success
```

Cart information includes:

- Product
- Quantity
- Unit price
- Subtotal
- Order total

---

## ❤️ Wishlist Flow

Authenticated users can save products to their wishlist.

```text
Product
   ↓
Add to Wishlist
   ↓
POST /api/wishlist
   ↓
Redux State
   ↓
Wishlist Page
```

The navigation bar also displays the current number of wishlist items.

---

## ⭐ Reviews

Authenticated users can publish a review for a product.

Each review contains:

```text
Rating: 1–5 stars
Comment
Product
User
```

The interface provides an interactive star rating component instead of a traditional select input.

Example:

```text
★★★★★  5/5
```

Reviews are accessed through:

```text
POST /api/product/{productId}/reviews
GET  /api/product/{productId}/reviews
```

---

## 🛡️ Protected Routes

The project separates authenticated and administrator-only pages.

### ProtectedRoute

Used for pages that require authentication, such as:

```text
/cart
/wishlist
/checkout/success
```

### AdminRoute

Used for pages that require an authenticated administrator:

```text
/admin
```

The route checks the authenticated user's role before allowing access.

---

## 🎮 Administration Panel

The administration panel provides CRUD operations for the product catalog.

Administrators can:

- Create a new product
- Upload an image
- Update product information
- Update price
- Update stock
- Delete products

Product creation and updates use `FormData` to support image uploads.

Example structure:

```text
product → JSON product information
image   → image file
```

The backend stores product information in PostgreSQL and handles product image uploads through Cloudinary.

---

## 🧠 State Management

Redux Toolkit is used for global application state.

The main slices are:

### authSlice

Manages:

- Authenticated user
- Authentication status
- Login
- Logout
- User profile

### productsSlice

Manages:

- Product catalog
- Product loading states
- Product errors

### cartSlice

Manages:

- Active cart
- Cart items
- Checkout
- Order information

### wishlistSlice

Manages:

- Wishlist products
- Add operations
- Remove operations
- Loading states

---

## 🎨 Styling

The application uses CSS Modules to keep component styles isolated.

The interface follows a dark gaming-inspired design using:

- Dark navy backgrounds
- Blue accents
- Cyan highlights
- Gradient buttons
- Responsive cards
- Interactive hover states
- Responsive layouts

Example:

```js
import styles from "./ProductCard.module.css";
```

```jsx
<div className={styles.card}>
  ...
</div>
```

This prevents style collisions between components.

---

## 📱 Responsive Design

The interface adapts to desktop, tablet, and mobile devices.

Responsive behavior includes:

- Collapsible navigation menu
- Responsive product grids
- Adaptive product detail layout
- Responsive shopping cart
- Mobile-friendly administration panel
- Full-width buttons on smaller screens

---

## 📌 Best Practices Applied

- Component-based React architecture
- Separation between API, UI and state management
- Centralized Axios configuration
- Redux Toolkit for global state
- Async thunks for API operations
- Protected routes
- Role-based authorization
- CSS Modules
- Environment variables
- Reusable components
- Loading and error states
- Responsive design
- REST API integration
- HTTP-only cookie authentication
- Client-side form validation
- Backend validation as the final source of truth

---

## 🔗 Backend

This frontend requires the Pixel Market backend API.

Backend repository:

```text
https://github.com/antony-s17/ecommerce-backend
```

The backend provides:

- Authentication
- Product CRUD
- PostgreSQL persistence with Prisma
- MongoDB/Mongoose reviews
- Shopping cart
- Wishlist
- Checkout
- Cloudinary image management
- Swagger/OpenAPI documentation

---

## 👨‍💻 Author

**Antony Salas**

GitHub: https://github.com/antony-s17

---

## 📄 License

This project was developed for educational and portfolio purposes.