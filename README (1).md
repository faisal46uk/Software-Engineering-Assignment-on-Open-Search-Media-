
# Open Media Search – Faisal's Project

This project is a web-based media search engine integrated with the Openverse API, designed by Faisal for educational and functional demonstration. It includes features like secure user authentication, search history tracking, and responsive design using a modern full-stack approach.

## Project Overview

The system includes:
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: SQL Server
- **API**: Openverse

## Getting Started

1. **Clone the Repository**
```
git clone https://github.com/faisal46uk/Software-Engineering-Assignment-on-Open-Search-Media-.git
cd Software-Engineering-Assignment-on-Open-Search-Media-
```

2. **Set Environment Variables**
Create a `.env` file in your backend directory. Use `.env.example` as a reference if available.

3. **Run with Docker**
Ensure Docker is installed. Then run:
```
docker-compose up --build
```

## Testing Instructions

- Unit testing: `npm run test`
- End-to-end testing: `npx cypress open`

## Features

- Media search via Openverse API
- Search history and user management
- API error handling
- Modular frontend and backend code
- Fully dockerized

## License

This repository is developed for academic purposes and uses openly licensed media from Openverse.
