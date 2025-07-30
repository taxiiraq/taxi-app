# Taxi App for Mobile 📱

A comprehensive React Native application for managing taxi and delivery services with separate interfaces for customers, drivers, and administrators.

## 🚀 Features

### 🚗 For Customers
- ✅ Login and account creation
- ✅ New delivery request
- ✅ Track order status
- ✅ View previous orders
- ✅ Contact driver
- ✅ Technical support

### 🚘 For Drivers
- ✅ Login and account creation
- ✅ View new orders
- ✅ Accept orders
- ✅ Manage delivery status
- ✅ Contact customer
- ✅ Technical support

### 👨‍💼 For Administrators
- ✅ Comprehensive dashboard
- ✅ Order management
- ✅ User management
- ✅ Driver management
- ✅ Technical support system

## 🛠 Technologies Used

- **React Native** - Core framework
- **Expo** - Development and deployment platform
- **TypeScript** - Type-safe code writing
- **React Navigation** - Screen navigation
- **React Native Paper** - UI components
- **React Native Elements** - Additional components

## 📱 Developed Screens

### Customer Screens
1. **Splash Screen** - App logo and login/register buttons
2. **Login Screen** - Email and password login
3. **Register Screen** - New account creation with role selection
4. **Customer Home Screen** - Previous orders and new request button
5. **Create Order Screen** - New order details input
6. **Track Order Screen** - Order status and driver information

### Driver Screens
1. **Driver Home Screen** - New orders and connection status
2. **Driver Order Screen** - Order details and control buttons

### Admin Screens
1. **Admin Panel** - Tabs for managing orders, users, drivers, and support

### Support Screen
- Interface for sending messages and inquiries

## 🚀 Installation and Setup

### Requirements
- Node.js (version 16 or later)
- npm or yarn
- Expo CLI

### Installation Steps

1. Install dependencies:
```bash
npm install
```

2. Run the application:
```bash
npm start
```

3. Open the app on your phone:
- Install Expo Go app on your phone
- Scan the QR code that appears in the browser

## 📁 Project Structure

```
src/
├── screens/
│   ├── SplashScreen.tsx          # Splash screen
│   ├── LoginScreen.tsx           # Login screen
│   ├── RegisterScreen.tsx        # Registration screen
│   ├── SupportScreen.tsx         # Support screen
│   ├── customer/
│   │   ├── CustomerHomeScreen.tsx    # Customer home screen
│   │   ├── CreateOrderScreen.tsx     # Create order screen
│   │   └── TrackOrderScreen.tsx      # Track order screen
│   ├── driver/
│   │   ├── DriverHomeScreen.tsx      # Driver home screen
│   │   └── DriverOrderScreen.tsx     # Driver order screen
│   └── admin/
│       └── AdminPanelScreen.tsx      # Admin panel
└── types/
    └── index.ts                      # TypeScript types
```

## 🗄 Suggested Database Schema

```sql
-- Users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role ENUM('customer', 'driver', 'admin') NOT NULL,
    status ENUM('active', 'banned', 'inactive') DEFAULT 'active',
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id VARCHAR(255) PRIMARY KEY,
    customer_id VARCHAR(255) NOT NULL,
    driver_id VARCHAR(255),
    address TEXT NOT NULL,
    description TEXT NOT NULL,
    notes TEXT,
    status ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (driver_id) REFERENCES users(id)
);

-- Support messages table
CREATE TABLE support_messages (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Notifications table
CREATE TABLE notifications (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    type ENUM('order_accepted', 'order_started', 'order_completed', 'new_order', 'order_cancelled') NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔔 Notification System

### For Customers:
- "Your order has been accepted"
- "Driver has started delivery"
- "Delivery completed successfully"

### For Drivers:
- "New order received"
- "Your order has been cancelled"
- "New order details"

## 🌐 Deployment on Netlify

For web app (if web support is added):

1. Build the application:
```bash
npm run web:build
```

2. Upload the `web-build` folder to Netlify

## 🤝 Contributing

1. Fork the project
2. Create a new feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, please contact via:
- Email: support@taxi-app.com
- Phone: +966-XXX-XXXX

---

**This application was developed using the latest technologies and best practices in mobile app development.** 