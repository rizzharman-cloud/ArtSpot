# Art Gallery Project

## Project Structure

```
├── frontend/           # Client-side files
│   ├── pages/         # Pug templates
│   ├── partials/      # Pug partials
│   └── *.js           # Client-side JavaScript files
├── backend/           # Server-side files
│   ├── artwork/       # Artwork data files
│   ├── server.js      # Express server
│   ├── database-initializer.js
│   └── package.json
└── README.md
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Initialize the MongoDB database:**
   ```bash
   cd backend
   node database-initializer.js
   ```

3. **Start the server:**
   ```bash
   cd backend
   node server.js
   ```

4. **Access the application:**
   Open your browser and go to http://localhost:3000/

## Features

- User authentication and account creation
- Artist and patron account types
- Artwork browsing and searching
- Review/like system for artworks
- Artist following functionality
- Workshop creation and registration
- Notifications system

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** Pug templating engine, Vanilla JavaScript
- **Session Management:** express-session