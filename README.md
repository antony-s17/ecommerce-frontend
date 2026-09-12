# Pixel Market Frontend

📌 Description

Frontend application for **Pixel Market**, a full-stack video game e-commerce project.

The application provides a responsive user interface for browsing products, viewing product details, managing a shopping cart and wishlist, publishing product reviews, and completing payments through Stripe Checkout.

It also includes authentication, role-based access control, protected routes, an administration panel for product management, and payment confirmation after successful Stripe transactions.

The frontend consumes the Pixel Market REST API and uses cookie-based JWT authentication.

---

## 🚀 Demo

- Frontend: `https://pixel-market-videogames.netlify.app`
- Backend API: `https://ecommerce-backend-6dm1.onrender.com/api`
- Swagger UI: `https://ecommerce-backend-6dm1.onrender.com/api/docs`

---

## 🛠️ Technologies

- React
- Vite
- JavaScript (ES Modules)
- React Router DOM
- Redux Toolkit
- Axios
- CSS Modules
- Stripe Checkout
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
- Stripe Checkout integration
- Redirect to Stripe-hosted payment page
- Stripe payment confirmation
- Order creation after successful payment
- Checkout success page
- Cart cleanup after successful checkout

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
│   └── _redirects
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

Stripe secret credentials are **not stored in the frontend**. Stripe Checkout Sessions are created by the backend.

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
| `/checkout/success` | Stripe checkout confirmation | Authenticated |
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

### Checkout Endpoints

Stripe checkout is initialized through:

```text
POST /api/cart/checkout
```

The backend creates a Stripe Checkout Session and returns the Stripe-hosted payment URL.

After payment, the Stripe Checkout Session is confirmed through:

```text
POST /api/cart/checkout/confirm
```

The frontend sends the Stripe `sessionId` to the backend. The backend verifies the payment before creating the final order.

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
Pay with Stripe
      ↓
POST /api/cart/checkout
      ↓
Stripe Checkout
      ↓
Payment
      ↓
/checkout/success?session_id=...
      ↓
POST /api/cart/checkout/confirm
      ↓
Order Creation
      ↓
Cart Completion
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

## 💳 Stripe Checkout

Pixel Market integrates **Stripe Checkout** to process payments securely in test mode.

Payment information is entered directly on the Stripe-hosted Checkout page. The frontend does not handle or store card information.

The checkout process follows this flow:

```text
Shopping Cart
      ↓
POST /api/cart/checkout
      ↓
Backend creates Stripe Checkout Session
      ↓
Frontend receives Stripe Checkout URL
      ↓
Redirect to Stripe Checkout
      ↓
User completes payment
      ↓
Stripe redirects to
/checkout/success?session_id=...
      ↓
Frontend reads session_id
      ↓
POST /api/cart/checkout/confirm
      ↓
Backend retrieves Stripe Checkout Session
      ↓
Verify payment_status === "paid"
      ↓
Validate authenticated user
      ↓
Create Order
      ↓
Complete Cart
      ↓
Checkout Success Page
```

### Starting a Payment

When the user clicks **Pay with Stripe**, the frontend sends:

```text
POST /api/cart/checkout
```

The backend creates a Stripe Checkout Session using the products currently stored in the authenticated user's cart.

The backend returns:

```text
Stripe Checkout URL
Stripe Session ID
```

The frontend then redirects the browser to the Stripe-hosted Checkout page.

### Payment Confirmation

After a successful payment, Stripe redirects the browser to:

```text
/checkout/success?session_id={CHECKOUT_SESSION_ID}
```

`CheckoutSuccessPage` reads the `session_id` from the URL and sends it to:

```text
POST /api/cart/checkout/confirm
```

The backend retrieves the Checkout Session directly from Stripe and verifies that:

```text
payment_status === "paid"
```

It also verifies that the Stripe Session belongs to the authenticated user.

Only after the payment has been successfully verified is the order created.

### Stripe Test Mode

The project currently uses Stripe in test mode.

A standard Stripe test card can be used:

```text
Card number: 4242 4242 4242 4242
Expiration: Any future date
CVC: Any valid 3-digit value
```

No real payment is processed while Stripe test credentials are being used.

### Stripe Security

Stripe secret credentials are stored exclusively in the backend.

The frontend does **not** contain:

```text
STRIPE_SECRET_KEY
sk_test_...
```

The frontend only communicates with the Pixel Market backend, while the backend communicates securely with Stripe.

This prevents Stripe secret credentials from being exposed in the browser.

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
- Cart loading states
- Stripe checkout initialization
- Checkout errors
- Order information
- Cart cleanup after successful payment

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

## 🌐 Netlify Deployment

The frontend can be deployed to Netlify.

The production API URL should be configured as an environment variable in Netlify:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

Because Pixel Market uses React Router, direct access to client-side routes requires an SPA fallback.

The project includes:

```text
public/_redirects
```

with:

```text
/*    /index.html    200
```

During the Vite build, the file is copied to:

```text
dist/_redirects
```

This allows Netlify to serve `index.html` when accessing or refreshing routes such as:

```text
/products
/product/:id
/cart
/wishlist
/admin
/checkout/success
```

React Router then handles the requested route on the client.

This configuration is particularly important for Stripe because Stripe redirects the browser directly to:

```text
/checkout/success?session_id=...
```

after a successful payment.

Without the SPA fallback, Netlify would attempt to find a physical `/checkout/success` file and return a 404 page.

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
- Stripe-hosted payment interface
- Backend payment verification
- Stripe secret key isolation
- SPA fallback routing for Netlify

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
- Stripe Checkout Session creation
- Stripe payment verification
- Order creation after successful payment
- Cloudinary image management
- Swagger/OpenAPI documentation

---

## 👨‍💻 Author

**Antony Salas**

GitHub: https://github.com/antony-s17

---

## 📄 License

This project was developed for educational and portfolio purposes.