# 🛒 GreenCart — Full-Stack Grocery Store

GreenCart is a **full-stack grocery e-commerce web application** built using the **MERN stack**. It provides users with a complete online shopping experience — from browsing products across different categories and managing a shopping cart to placing orders through **Cash on Delivery (COD)** or **online payment using Cashfree**.

The project is designed to simulate a real-world grocery shopping platform with a complete product-to-order workflow.

---

## 🚀 Features

### 👤 User Features

* Browse grocery products across multiple categories
* View available products and product details
* Add products to the shopping cart
* Increase or decrease product quantities
* Remove products from the cart
* View cart total and order details
* Place orders using:

  * 💵 Cash on Delivery (COD)
  * 💳 Online Payment through Cashfree
* View previously placed orders in **My Orders**
* Automatic redirection to the **My Orders** page after successful online payment

### 💳 Payment Integration

GreenCart integrates the **Cashfree Payment Gateway** to support online payments.

The online payment flow includes:

1. User adds products to the cart
2. User proceeds to checkout
3. User selects online payment
4. Cashfree payment gateway is initiated
5. Payment is completed
6. Order is processed
7. User is redirected to the **My Orders** page

---

## 🛠️ Tech Stack

| Layer            | Technology   |
| ---------------- | ------------ |
| Frontend         | React.js     |
| Backend          | Node.js      |
| Server Framework | Express.js   |
| Database         | MongoDB      |
| Payment Gateway  | Cashfree     |
| API Architecture | REST API     |
| Package Manager  | npm          |
| Version Control  | Git & GitHub |

---

## 🏗️ Project Architecture

The project follows a client-server architecture:

```text
GREENCART/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

### Client

The `client` application is responsible for:

* User interface
* Product browsing
* Category navigation
* Cart management
* Checkout interface
* Order history
* Communication with backend APIs

### Server

The `server` application handles:

* REST APIs
* Product and order operations
* User-related operations
* Database communication
* Order processing
* Payment integration

---

## 🔄 Application Workflow

```text
              ┌─────────────────┐
              │   User visits   │
              │    GreenCart    │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Browse Products │
              │   & Categories  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   Add to Cart   │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │     Checkout    │
              └────────┬────────┘
                       │
                ┌──────┴──────┐
                │             │
                ▼             ▼
             ┌─────┐      ┌──────────┐
             │ COD │      │ Cashfree │
             └──┬──┘      │  Payment │
                │         └─────┬────┘
                │               │
                └───────┬───────┘
                        ▼
                ┌───────────────┐
                │ Order Placed  │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │   My Orders   │
                └───────────────┘
```

---

## 💡 Key Implementation Highlights

### 🛍️ Product & Cart Management

Users can browse products from different categories and add products to their cart. Cart functionality allows users to manage quantities and remove unwanted products before checkout.

### 📦 Order Management

The application supports a complete order placement workflow. After successfully placing an order, users can access their order history through the **My Orders** section.

### 💰 Multiple Payment Options

The application supports both:

* **Cash on Delivery**
* **Online Payment using Cashfree**

This provides users with flexibility during checkout.

### 🔗 Client-Server Communication

The React frontend communicates with the Node.js/Express backend through REST APIs. The backend handles application logic and communicates with MongoDB for persistent data storage.

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm
* MongoDB
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/SATWANIHIMANSHU/GREENCART.git
```

```bash
cd GREENCART
```

---

### 2. Setup the Client

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

---

### 3. Setup the Server

Open another terminal:

```bash
cd server
npm install
```

Start the backend server using the command defined in the server's `package.json`.

For example:

```bash
npm run dev
```

> Use the exact script available in your `server/package.json` if it differs.

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` directory and configure the required environment variables.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
```

**Never commit your `.env` file or API credentials to GitHub.**

---

## 💳 Cashfree Payment Setup

To enable online payments:

1. Create a Cashfree merchant account.
2. Obtain your API credentials.
3. Add the credentials to the server's `.env` file.
4. Configure the required Cashfree payment settings.
5. Run the backend and frontend applications.
6. Test the payment flow.

For development, use the appropriate **Cashfree test/sandbox environment** rather than real payment credentials.

---

## 📸 Project Demo

Add screenshots or a short demo video of the application here.

### 🏠 Home Page

*Add screenshot here*

### 🛒 Shopping Cart

*Add screenshot here*

### 💳 Checkout & Payment

*Add screenshot here*

### 📦 My Orders

*Add screenshot here*

---

## 🎯 Learning Outcomes

Building GreenCart helped me gain practical experience in:

* Developing a full-stack application using the MERN stack
* Building and consuming REST APIs
* Working with MongoDB
* Managing frontend application state
* Implementing shopping cart functionality
* Designing an end-to-end order workflow
* Integrating a third-party payment gateway
* Handling payment and order flows
* Structuring a client-server application
* Using Git and GitHub for version control

---

## 🔮 Future Improvements

Some features that can be added in future versions:

* 🔍 Product search and advanced filtering
* ⭐ Product reviews and ratings
* 📍 Order tracking
* ❤️ Wishlist functionality
* 🔔 Order notifications
* 👨‍💼 Admin dashboard
* 📊 Sales and order analytics
* 📱 Further mobile UI optimization

---

## 👨‍💻 Author

**Himanshu Satwani**

MCA Student | Full-Stack Developer | MERN Stack Enthusiast

### 🔗 Connect

* GitHub: https://github.com/SATWANIHIMANSHU
* Portfolio: https://satwanihimanshu.github.io/Personal-Portfolio-Website/

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

### 📄 License

This project is developed for **learning and portfolio purposes**.
