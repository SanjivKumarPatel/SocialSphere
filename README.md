# SocialSphere

SocialSphere is a full-stack mini social media application where users can create an account, share text or image posts, view posts from other users, like posts, and add comments.

The project was built as part of the **3W Full Stack Internship Assignment**.

## Features

- User signup and login
- JWT authentication
- Create text posts
- Create image posts
- Create posts with both text and images
- Public social feed
- View posts from all users
- Like and unlike posts
- Add comments to posts
- Display username, likes, and comments count
- Image upload using Cloudinary
- Responsive user interface

## Tech Stack

### Frontend

- React.js
- Axios
- React Router
- Basic CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Multer
- Cloudinary
- Streamifier

## Project Structure

```text
SocialSphere/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Clone the repository

```
git clone https://github.com/SanjivKumarPatel/SocialSphere
```
Navigate to the project:

```
cd SocialSphere
```

## Backend Setup
Navigate to the backend folder:

```
cd backend
```
Install dependencies:

```
npm install
```
Create a `.env` file inside the backend folder:

```
PORT=5000
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
Start the backend development server:

```
npm run dev
```
The backend will run on:

```
http://localhost:5000
```

## Frontend Setup
Navigate to the frontend folder:

```
cd frontend
```
Install dependencies:

```
npm install
```
Start the frontend development server:

```
npm run dev
```

## API Endpoints

### Authentication
MethodEndpointDescriptionPOST`/api/auth/register`Register a new userPOST`/api/auth/login`Login a user
### Posts
MethodEndpointDescriptionGET`/api/posts`Get all postsPOST`/api/posts`Create a new postPUT`/api/posts/:id/like`Like or unlike a postPOST`/api/posts/:id/comment`Add a comment
## Database
The application uses only two MongoDB collections:

- `users`
- `posts`
Comments and likes are stored within the post document.

## Image Upload
Images are uploaded using Cloudinary.

A user can create:

- A text-only post
- An image-only post
- A post containing both text and an image

## Deployment

### Frontend
Deployed using Vercel.
[Live Demo](https://social-sphere-sand.vercel.app)

### Backend
Deployed using Render.
[Backend API](https://socialsphere-8bmz.onrender.com)

### Database
MongoDB Atlas is used as the cloud database.

## Assignment Requirements Covered

- User signup and login
- MongoDB database integration
- Text and image posts
- Public feed
- Like and unlike functionality
- Comment functionality
- Instant UI updates
- Responsive design
- Separate frontend and backend folders
- React.js frontend
- Node.js and Express backend
- MongoDB database
- Deployment using Vercel, Render, and MongoDB Atlas

## Author
**Sanjiv Kumar Patel**
