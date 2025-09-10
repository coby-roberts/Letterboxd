# Letterboxd Dupe API

A RESTful API for tracking users watched films, ratings, and discovering.

## 🚀 Features
- Add films to watched list
- Rate watched films
- JWT token management

## 🛠️ Tech Stack
- Spring Boot 3.x
- PostgreSQL
- Spring Security
- JWT Authentication
- Lombok

## 📋 API Endpoints

### Authentication
- `POST /account/login` - User login
- `POST /account/signup` - Refresh JWT token

### Account Settings
- `GET /settings` - Profile Info
- `PATCH /settings/me` - Update Profile Info
- `PUT /settings/username` - Update Username

### Users & Watchlist
- `GET /users/{username}` - Gets User profile details
- `GET /users/{username}/films` - Get all of a users watched films
- `GET /users/{username}/diary` - Get all of a users diary entries
- `POST /users/diary/{id}` - Create a Diary Entry
- `GET /users/{username}/reviews` - NOT IMPLEMENTED
- `POST /users/watched/{movieId}` - Set film as watched

- `PUT /users/me/watched/{id}` - Update rating
- `DELETE /users/me/watched/{id}` - Remove from watched list

### Films
- `GET /film/{id}`

## 📖 API Documentation

### Add Film to Watched List
```http
POST /users/me/watched
Content-Type: application/json
Authorization: Bearer {jwt_token}

{
  "film": {
    "id": 1,
    "title": "The Matrix",
    "director": "The Wachowskis",
    "release_date": "1999-03-31"
  },
  "watched": {
    "rating": 9
  }
}
