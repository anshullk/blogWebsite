## Welcome aboard!

This is a full-stack blogging platform built with Node.js, Express, MongoDB, Mongoose, and EJS.
Platform Users can create, view, and delete blog posts, with all data persisted in MongoDB, either locally or cloud-based.

---

## Features

* Create blog posts
* View all published posts on the home page
* Read individual posts on dedicated pages
* Delete existing posts
* MongoDB database integration
* Dynamic routing using Express
* Server-side rendering with EJS
* Environment variable support using dotenv

---

## Installation

### 1. Clone the repository

```bash
git clone https://www.github.com/anshullk/blogWebsite
cd blogWebsite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/blogDB
PORT=3000
```

For MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogDB
PORT=3000
```

### 4. Start MongoDB

If using a local MongoDB installation, run the following in your terminal:

```bash
mongod
```

### 5. Run the application

```bash
node server.js
```

The server will start on:

```text
http://localhost:3000
```
---
