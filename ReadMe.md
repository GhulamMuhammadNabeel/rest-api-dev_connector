
# 🚀 Dev Connector API

## 📝 Introduction
The Dev Connector API is an open-source RESTful API that provides developers with a professional social networking platform. With the help of this API, developers can create their profiles, share projects, and connect with industry professionals.

## ✨ Features
- Secure user authentication (JWT-based login/signup)
- User profiles with experience, education, and skills
- Create, edit, and delete posts
- Commenting and liking system
- Developer networking and connections


## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (JSON Web Token)
- **Avatar**: Gravatar (for profile pictures )
- **API Testing**: Postman / Thunder Client

## 🚀 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/GhulamMuhammadNabeel/rest-api-dev_connector.git
   
## 🔗 API Endpoints





| Method | Endpoint     | Description                | Access | 
| :-------- | :------- | :------------------------- | :---- |
| `POST` | `/api/users/register` | Register a new User | Public |
| `POST` | `/api/users/login` | Authenticate user & get token | Public |
| `POST` | `/api/users/current` | Get Current user details | Private |
| `POST` | `/api/profile` | Create Profile | Private |
| `Delete` | `/api/profile` | Delete Profile | Private |
| `GET` | `/api/profile/all` | Get All users having Profile | Public |
| `GET` | `/api/profile` | Get current user's profile | Private |
| `GET` | `/api/profile/user/:user_id` | Get profile by user ID | Private |
| `GET` | `/api/profile/handle/:handle` | Get profile by handle | Public |
| `POST` | `/api/profile/experience` | Add experience to profile | Private |
| `Delete` | `/api/profile/experience/:exp_id` | Delete experience from profile | Private |
| `POST` | `/api/profile/education` | Add education to profile | Private |
| `Delete` | `/api/profile/education/:edu_id` | Delete education from profile | Private |
| `POST` | `/api/posts` | Create Post | Private |
| `GET` | `/api/posts` | Get All Posts | Public |
| `GET` | `/api/posts/:id` | Get post by ID  | Public |
| `Delete` | `/api/posts/:id` | Delete Post by ID | Private |
| `POST` | `/api/posts/like/:id` | Like a Post | Private |
| `POST` | `/api/posts/unlike/:id` | Unlike a Post | Private |
| `POST` | `/api/posts/comment/:id` | Comment on a Post | Private |
| `POST` | `/api/posts/comment/:id/:comment_id` | Delete Comment from a Post | Private |




## ☘ Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI` Your MONGO connection String

`SECRET` The JWT secret key


## 🔮 Future Improvements

We are continuously working to improve the Dev Connector API. Some upcoming features include:

- **Post Images**: Allow users to upload images along with their posts.
- **Custom Profile Photo Upload**: Users will be able to upload and change their profile pictures easily.
- **More Enhancements**: Additional features and optimizations for better performance and user experience.

