# AI Blog App - Backend

A Node.js backend API for an AI-powered blog application with content generation, image management, and admin dashboard.

## 🚀 Features

- **AI Content Generation** - Generate blog content using Google Gemini AI
- **Image Management** - Upload and optimize images with ImageKit
- **Blog Management** - Full CRUD operations for blog posts
- **Comment System** - User comments with admin approval
- **Admin Dashboard** - Complete admin panel with JWT authentication
- **File Upload** - Secure file upload with Multer

## 🛠️ Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- Google Generative AI (Gemini)
- ImageKit (Image Storage)
- JWT Authentication
- Multer (File Upload)

## ⚙️ Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create `.env` file:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   
   # Admin Credentials
   ADMIN_EMAIL=admin@gmail.com
   ADMIN_PASSWORD=admin123
   
   # ImageKit Credentials
   IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGE_KIT_URL_ENDPOINT=your_imagekit_url_endpoint
   
   # Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Start the server**
   ```bash
   # Development
   npm run server
   
   # Production
   npm start
   ```

## 📁 Project Structure

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   ├── gemini.js          # Google Gemini AI
│   └── imageKit.js        # ImageKit configuration
├── controller/
│   ├── adminController.js # Admin controllers
│   └── blogController.js  # Blog controllers
├── middleware/
│   ├── auth.js           # JWT authentication
│   └── multer.js         # File upload
├── models/
│   ├── Blog.js           # Blog schema
│   └── Comment.js        # Comment schema
├── routes/
│   ├── adminRoute.js     # Admin API routes
│   └── blogRoute.js      # Blog API routes
└── server.js            # Main server file
```

## 🔌 API Endpoints

### Blog Routes (`/api/blog`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create blog post | ✅ |
| GET | `/all` | Get all published blogs | ❌ |
| GET | `/:blogId` | Get blog by ID | ❌ |
| DELETE | `/:blogId` | Delete blog post | ✅ |
| PUT | `/:blogId/toggle-publish` | Toggle publish status | ✅ |
| POST | `/generate-content` | Generate AI content | ❌ |
| POST | `/add-comment` | Add comment | ❌ |
| POST | `/comments` | Get approved comments | ❌ |

### Admin Routes (`/api/admin`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/login` | Admin login | ❌ |
| GET | `/blogs` | Get all blogs (admin) | ✅ |
| GET | `/comments` | Get all comments (admin) | ✅ |
| GET | `/dashboard` | Get dashboard stats | ✅ |
| DELETE | `/delete-comment` | Delete comment | ✅ |
| PUT | `/approve-comment` | Approve comment | ✅ |


## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_secure_password
IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
IMAGE_KIT_URL_ENDPOINT=your_imagekit_endpoint
GEMINI_API_KEY=your_gemini_api_key
```

### Deploy Steps
1. Set up MongoDB database
2. Configure environment variables
3. Install dependencies: `npm install`
4. Start: `npm start`

## 🔧 Available Scripts

- `npm run server` - Development server with nodemon
- `npm start` - Production server


## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📞 Support

Open an issue for bugs or questions. 