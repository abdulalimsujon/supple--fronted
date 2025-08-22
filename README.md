# Supple - Restaurant Management System

**Supple** is a modern, full-featured restaurant management system designed to streamline operations for restaurants of all sizes. It provides tools for menu management, dynamic layouts, QR code ordering, real-time order tracking, and subscription-based analytics for owners and admins.  

---

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Authentication & Roles](#authentication--roles)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Tech Stack

**Frontend**  
- React  
- TypeScript  
- Redux Toolkit  
- Tailwind CSS  
- [shadcn/ui](https://shadcn.dev)  

**Backend**  
- Express.js  
- MongoDB & Mongoose  
- Stripe (Payment & Subscription Handling)  

---

## Features

### User Roles
- **Admin** – Manage all restaurants, analytics, and subscriptions.  
- **Owner** – Create and manage restaurants, generate QR codes, create sub-users.  
- **Staff** – Manage dine-in and takeaway orders.  
- **User** – Scan QR codes, place orders, and track order status.  

### Restaurant Management
- Create, update, and delete restaurants.  
- Generate dynamic QR codes for tables or takeaway orders.  
- Build custom restaurant layouts with a drag-and-drop interface.  
- Manage menus in real-time with categories, items, and pricing.  

### Orders
- Real-time dine-in and takeaway order management.  
- Staff dashboard for order processing.  
- User-facing interface for order tracking via QR code.  

### Analytics & Billing
- Owner & Admin dashboards with insights on orders, revenue, and popular menu items.  
- Stripe-based subscription plans for premium features.  

---

## Getting Started

### Prerequisites
- Node.js >= 18.x  
- MongoDB (local or Atlas)  
- npm or yarn  
- Stripe account for handling payments  

### Installation

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI, JWT secret, and Stripe keys
npm run dev
