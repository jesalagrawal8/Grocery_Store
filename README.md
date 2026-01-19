# 🛒 FreshCart - Full Stack Grocery E-Commerce Platform

<div align="center">

![FreshCart Banner](https://img.shields.io/badge/FreshCart-Grocery%20Store-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**A modern, feature-rich online grocery store with real-time inventory management and cloud-based image storage**

[Live Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation & Setup](#-installation--setup)
- [Admin/Seller Access](#-adminseller-access)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🎯 Overview

**FreshCart** is a full-stack e-commerce web application designed for online grocery shopping. It provides a seamless shopping experience with features like product browsing, cart management, order tracking, and an admin dashboard for inventory control. The platform uses **Cloudinary** for cloud-based image storage, ensuring images persist across deployments.

### 🎨 Why This Project?

- Solves real-world problems with cloud storage integration
- Demonstrates full-stack development skills (MERN)
- Implements modern authentication and authorization patterns
- Showcases responsive UI/UX design principles
- Production-ready with deployment considerations

---

## ✨ Features

### 👥 Customer Features
- 🔐 **User Authentication** - Secure JWT-based login/signup
- 🛍️ **Product Browsing** - Filter by categories (Vegetables, Fruits, Dairy, etc.)
- 🔍 **Search Functionality** - Real-time product search
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 📦 **Order Management** - Place orders with COD or online payment
- 📍 **Address Management** - Save and manage delivery addresses
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop

### 🔧 Admin/Seller Features
- 📊 **Admin Dashboard** - Comprehensive product and order management
- ➕ **Product Management** - Add, edit, and delete products
- 📸 **Cloud Image Upload** - Automatic upload to Cloudinary
- 📝 **Bulk Description** - Multi-line product descriptions (bullet points)
- 📦 **Order Processing** - View and manage customer orders
- 🔄 **Stock Management** - Real-time inventory control
- 🖼️ **Multi-Image Support** - Up to 4 images per product

### 🚀 Technical Highlights
- ☁️ **Cloudinary Integration** - Images persist across redeployments
- 🔒 **Secure Authentication** - HTTP-only cookies, bcrypt hashing
- 📡 **RESTful API** - Clean, scalable backend architecture
- 🎨 **Modern UI** - Tailwind CSS with smooth animations
- 🌐 **CORS Enabled** - Secure cross-origin requests
- 📦 **Multer Integration** - File upload handling with memory storage

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library with latest features |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **React Hot Toast** | Elegant notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js 5** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | Secure token-based authentication |
| **Bcrypt.js** | Password hashing |
| **Cloudinary** | Cloud-based image storage |
| **Multer** | File upload middleware |
| **Cookie Parser** | Parse cookies |
| **CORS** | Cross-origin resource sharing |

### DevOps & Tools
- **Git** - Version control
- **Dotenv** - Environment variable management
- **ESLint** - Code quality
- **Nodemon** - Development auto-restart
- **Vercel** - Frontend deployment
- **Cloud hosting** - Backend deployment ready

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FreshCart Architecture                │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐          ┌──────────────────┐
│                  │          │                  │
│   React Client   │ ◄──────► │  Express Server  │
│   (Port 5173)    │   REST   │   (Port 5000)    │
│                  │   API    │                  │
└──────────────────┘          └────────┬─────────┘
        │                              │
        │                              ├─────► MongoDB Atlas
        │                              │       (Database)
        │                              │
        │                              └─────► Cloudinary
        │                                      (Image Storage)
        │
        └─────────► Static Assets (Vite Build)
```

### Data Flow
1. **User Request** → React Component
2. **API Call** → Axios interceptor with JWT
3. **Express Route** → Authentication middleware
4. **Controller Logic** → Business logic processing
5. **Database Query** → MongoDB via Mongoose
6. **Image Upload** → Cloudinary via Multer
7. **Response** → JSON with success/error status
8. **UI Update** → React state management

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- Cloudinary Account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/freshcart.git
cd freshcart
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EOF

# Start backend server
npm start
```

### 3. Frontend Setup
```bash
cd ../client
npm install

# Create .env file
echo 'VITE_BACKEND_URL="http://localhost:5000"' > .env

# Start frontend development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

---

## 🔐 Admin/Seller Access

### Default Admin Credentials
To access the admin dashboard and manage products/orders:

**Login Route**: `/admin/login` or click "Admin" button in navbar

```
Email: admin@freshcart.com
Password: admin123
```

### Admin Capabilities
1. **Add Products**
   - Navigate to Admin Dashboard
   - Click "Add Product"
   - Upload up to 4 images (auto-uploaded to Cloudinary)
   - Add description with bullet points (one per line)
   - Set price, offer price, and category

2. **Manage Products**
   - View all products in Product List
   - Toggle stock status (In Stock/Out of Stock)
   - Delete products

3. **Process Orders**
   - View all customer orders
   - Update order status
   - Track order history

### Creating New Admin Account
You can create a new seller account by:
1. Registering through the seller signup page
2. Or directly in MongoDB by setting `isSeller: true`

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/product/get
```

#### Add Product (Admin Only)
```http
POST /api/product/add-product
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "name": "Potato 500g",
  "description": "Fresh and organic\nRich in carbohydrates\nIdeal for curries",
  "category": "Vegetables",
  "price": 25,
  "offerPrice": 20,
  "image": [file1, file2, file3, file4]
}
```

#### Update Stock Status
```http
POST /api/product/stock
Content-Type: application/json
Authorization: Bearer <token>

{
  "id": "product_id",
  "inStock": true
}
```

### Cart Endpoints

#### Get Cart
```http
GET /api/cart/get
Authorization: Bearer <token>
```

#### Add to Cart
```http
POST /api/cart/add
Content-Type: application/json
Authorization: Bearer <token>

{
  "productId": "product_id"
}
```

### Order Endpoints

#### Get User Orders
```http
GET /api/order/user
Authorization: Bearer <token>
```

#### Get Seller Orders (Admin)
```http
GET /api/order/seller
Authorization: Bearer <token>
```

---

## 📸 Screenshots

### Customer View
- **Home Page**: Category cards, featured products, and hero section
- **Product Details**: Multiple images, descriptions, add to cart
- **Shopping Cart**: Quantity management and order summary
- **Order Tracking**: View order status and history

### Admin Dashboard
- **Product Management**: Add/edit products with Cloudinary upload
- **Order Management**: View and process customer orders
- **Inventory Control**: Stock status toggle

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Payment Gateway Integration (Stripe/Razorpay)
- [ ] Email Notifications (Order confirmation, shipping updates)
- [ ] Product Reviews and Ratings
- [ ] Advanced Search with Filters (Price range, brand)
- [ ] Wishlist Functionality
- [ ] Admin Analytics Dashboard
- [ ] Multi-vendor Support
- [ ] Push Notifications
- [ ] Social Media Authentication (Google, Facebook)
- [ ] Discount Coupons and Promo Codes

### Performance Improvements
- [ ] Redis Caching for frequently accessed products
- [ ] Image Lazy Loading and Optimization
- [ ] Server-Side Rendering (SSR)
- [ ] Progressive Web App (PWA)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Project Structure

```
freshcart/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js          # Cloudinary configuration
│   │   ├── connectDB.js           # MongoDB connection
│   │   └── multer.js              # File upload config
│   ├── controller/
│   │   ├── user.controller.js     # User authentication logic
│   │   ├── product.controller.js  # Product CRUD operations
│   │   ├── cart.controller.js     # Cart management
│   │   └── order.controller.js    # Order processing
│   ├── middlewares/
│   │   ├── authUser.js            # User authentication middleware
│   │   └── authSeller.js          # Seller authorization middleware
│   ├── models/
│   │   ├── user.model.js          # User schema
│   │   ├── product.model.js       # Product schema
│   │   ├── order.model.js         # Order schema
│   │   └── address.model.js       # Address schema
│   ├── routes/
│   │   ├── user.routes.js         # User routes
│   │   ├── product.routes.js      # Product routes
│   │   ├── cart.routes.js         # Cart routes
│   │   └── order.routes.js        # Order routes
│   ├── index.js                   # Express server entry point
│   └── package.json
│
├── client/
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── assets/                # Images, icons, dummy data
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation component
│   │   │   ├── ProductCard.jsx    # Product card component
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── AppContext.jsx     # Global state management
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Home page
│   │   │   ├── Products.jsx       # Products listing
│   │   │   ├── ProductDetails.jsx # Product detail view
│   │   │   ├── Cart.jsx           # Shopping cart
│   │   │   ├── MyOrders.jsx       # User orders
│   │   │   └── seller/
│   │   │       ├── AddProduct.jsx # Add product form
│   │   │       ├── ProductList.jsx# Product management
│   │   │       └── Orders.jsx     # Order management
│   │   ├── utils/
│   │   │   └── imageHelper.js     # Cloudinary URL helper
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md                      # This file
```

---

## 🐛 Known Issues & Solutions

### Images Not Displaying After Deployment
**Solution**: This project uses Cloudinary for image storage. Ensure:
1. Cloudinary credentials are set in `.env`
2. Images are uploaded through the admin dashboard (not manually placed in folders)
3. The `imageHelper.js` utility handles both Cloudinary URLs and local paths

### Description Not Showing as Bullets
**Solution**: When adding products, enter each description point on a new line:
```
Fresh and organic
Rich in carbohydrates
Ideal for curries and fries
```

---

## 📧 Contact

**Developer**: Your Name  
**Email**: your.email@example.com  
**LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)  
**Portfolio**: [yourportfolio.com](https://yourportfolio.com)  
**GitHub**: [@yourusername](https://github.com/yourusername)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **MongoDB** for the powerful database
- **Cloudinary** for seamless image storage
- **React & Vite** for the incredible developer experience
- **Tailwind CSS** for beautiful, responsive design
- All open-source contributors

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ by Jesal Agrawal**

[Back to Top](#-freshcart---full-stack-grocery-e-commerce-platform)

</div>
