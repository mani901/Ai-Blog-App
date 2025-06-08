# AI Blog App - Frontend

A modern React frontend for an AI-powered blog application with admin dashboard and content management.

## 🚀 Features

- **AI Content Generation** - Generate blog content with AI assistance
- **Rich Text Editor** - Quill.js for content creation
- **Admin Dashboard** - Complete admin panel with analytics
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Image Upload** - Drag-and-drop with preview
- **Real-time Notifications** - Toast notifications

## 🛠️ Tech Stack

- React 19 + Vite 6
- Tailwind CSS 4
- React Router DOM
- Quill.js (Rich Text Editor)
- Axios (HTTP Client)
- React Hot Toast

## ⚙️ Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── admin/         # Admin-specific components
│   ├── BlogCard.jsx   # Blog card component
│   ├── BlogList.jsx   # Blog listing component
│   ├── Header.jsx     # Header component
│   ├── Footer.jsx     # Footer component
│   └── ...
├── pages/             # Page components
│   ├── admin/         # Admin dashboard pages
│   │   ├── AddBlog.jsx    # Create/edit blog
│   │   ├── Dashboard.jsx  # Admin dashboard
│   │   └── ListBlog.jsx   # Blog management
│   ├── Blog.jsx       # Individual blog page
│   └── Home.jsx       # Homepage
├── context/           # React Context
└── assets/           # Static files
```

## 🎯 Key Pages

### Public
- **Home** - Landing page with blog listings
- **Blog** - Individual blog post with comments

### Admin (Protected)
- **Dashboard** - Analytics overview
- **Add Blog** - Create blogs with AI assistance
- **Manage Blogs** - Edit/delete existing blogs
- **Comments** - Moderate user comments

## 🤖 AI Integration

Generate content with a simple button click:


## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder
```

## 🔧 Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Run linter

## 🐛 Common Issues

1. **API Connection Error**
   - Ensure backend is running on port 3000
   - Check VITE_API_URL in .env

2. **Build Fails**
   - Delete node_modules and reinstall
   - Check for dependency conflicts

3. **Authentication Issues**
   - Clear browser localStorage
   - Check if admin credentials are correct

## 📝 Environment Variables

```env
VITE_API_URL=http://localhost:3000  # Backend API URL
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📞 Support

Open an issue for bugs or questions.