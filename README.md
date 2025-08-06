# AI Blog App

A full-stack AI-powered blog application with content generation capabilities, admin dashboard, and modern responsive design.
- **Live Demo**: https://ai-blog-app-two.vercel.app/

## 🚀 Features

- **AI Content Generation** - Generate blog content using Google Gemini AI
- **Rich Text Editor** - Quill.js for professional content creation
- **Image Management** - Upload and optimize images with ImageKit
- **Admin Dashboard** - Complete admin panel with analytics
- **Comment System** - User engagement with admin moderation
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Real-time Notifications** - Toast notifications for user feedback
- **Secure Authentication** - JWT-based admin authentication

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite 6
- Tailwind CSS 4
- React Router DOM
- Quill.js (Rich Text Editor)
- Axios + React Hot Toast

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Google Generative AI (Gemini)
- ImageKit (Image Storage)
- JWT Authentication + Multer

## 📁 Project Structure

```
ai-blog-app/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin dashboard pages
│   │   │   ├── Blog.jsx     # Individual blog page
│   │   │   └── Home.jsx     # Homepage
│   │   ├── context/         # React Context
│   │   └── assets/          # Static files
│   ├── package.json
│   └── README.md
├── backend/                  # Node.js API
│   ├── config/              # Database & API configurations
│   ├── controller/          # Route controllers
│   ├── middleware/          # Authentication & file upload
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── package.json
│   └── README.md
└── README.md                # This file
```

## ⚙️ Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB database
- Google Gemini API key
- ImageKit account

### 1. Clone Repository
```bash
git clone <repository-url>
cd ai-blog-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
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

Start backend:
```bash
npm run server  # Development
npm start       # Production
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

Start frontend:
```bash
npm run dev     # Development
npm run build   # Production build
```

## 🚀 Deployment

### Backend Deployment
```bash
# Set production environment variables
NODE_ENV=production
PORT=3000
MONGO_URI=your_production_mongodb_uri
# ... other variables

# Deploy
npm install
npm start
```

### Frontend Deployment

#### Vercel (Recommended)
```bash
cd frontend
npm run build
vercel --prod
```

#### Netlify
```bash
cd frontend
npm run build
# Upload dist/ folder to Netlify
```

## 🔧 Development Scripts

### Backend
```bash
npm run server  # Development with nodemon
npm start       # Production server
```

### Frontend
```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview build
npm run lint    # Run linter
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ai-blog
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
IMAGE_KIT_PUBLIC_KEY=your_key
IMAGE_KIT_PRIVATE_KEY=your_key
IMAGE_KIT_URL_ENDPOINT=your_endpoint
GEMINI_API_KEY=your_gemini_key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```



## 🎨 Features Overview

### Content Management
- Create blogs with rich text editor
- AI-powered content generation
- Image upload with optimization
- Category and publish management

### User Experience
- Responsive design for all devices
- Fast loading with modern tech stack
- Real-time notifications
- Intuitive admin interface

### Technical Features
- JWT authentication
- File upload handling
- AI integration
- Image optimization
- Comment moderation

## 📖 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- Open an issue for bugs or questions
- Check individual README files for detailed setup
- Review common troubleshooting steps above

## 🔗 Links


- **Design System**: Built with Tailwind CSS

---

**Built using React, Node.js** 
