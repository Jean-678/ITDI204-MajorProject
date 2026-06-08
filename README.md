# Vanuatu Centralized Booking System

## Overview
A tourism booking platform for Vanuatu allowing users to book accommodations, 
car rentals, and tour packages.

## Live Links
- **Production:** https://itdi204-majorproject.onrender.com
- **Staging:** https://itdi204-majorproject-1.onrender.com
- **Backend API:** https://your-backend.onrender.com

## Tech Stack
| Component | Technology |
|-----------|------------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Deployment | Render |
| CI/CD | GitHub Actions |

## API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/accommodations` | Get all accommodations |
| GET | `/car-rentals` | Get all car rentals |
| GET | `/tours` | Get all tours |
| POST | `/signup` | Register user |
| POST | `/login` | User login |
| PUT | `/update-profile` | Update profile |

## Environment Variables

### Backend (.env)
