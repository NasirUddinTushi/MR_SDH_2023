

---

# Django DRF Project - API Documentation

This is a **Django REST Framework (DRF)** based API project that provides user authentication and CMS management features. The project includes **Swagger UI** and **Redoc** for auto-generated, interactive API documentation.

---

## Quick Start (SQLite)

1. **Unzip the project**
2. **Create virtual environment & install requirements**

   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. **Run database migrations**

   ```bash
   python manage.py migrate
   ```
4. **Start server**

   ```bash
   python manage.py runserver
   ```
5. Open in browser:

   * API → `http://127.0.0.1:8000/api/`
   * Swagger → `http://127.0.0.1:8000/swagger/`
   * Redoc → `http://127.0.0.1:8000/redoc/`

---

## Features

* JWT-based authentication
* User registration, login, logout
* User profile management (view/update)
* Change password & OTP-based password reset
* CMS data API
* Contact message API
* Interactive API documentation (Swagger & Redoc)

---

## Project Structure

```
.
├── apps/                   
│   ├── account/            # User authentication & profile
│   └── cms/                # CMS data & contact form
├── project/                # Main Django project settings & urls
├── media/                  # Media uploads
├── staticfiles/            # Static files
├── manage.py               # Django entry point
├── requirements.txt        # Dependencies
└── README.md               # Documentation
```

---

## Setup Guide

### Prerequisites

* Python 3.9+
* Django 4.x
* Django REST Framework

---

### Installation

1. Clone or unzip the project

   ```bash
   unzip project.zip
   cd project-root
   ```

2. Create and activate a virtual environment

   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   ```

3. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

---

### Database Setup (SQLite by default)

No configuration needed.
Just run:

```bash
python manage.py migrate
python manage.py createsuperuser   # optional
```

SQLite database file (`db.sqlite3`) will be created automatically in the project root.

---

### Running the Application

```bash
python manage.py runserver
```

Open in browser:

* **API Root** → `http://127.0.0.1:8000/api/`
* **Swagger UI** → `http://127.0.0.1:8000/swagger/`
* **Redoc** → `http://127.0.0.1:8000/redoc/`

---

## API Documentation

### Authentication

* Obtain JWT token via login
* Add it in request header:

  ```
  Authorization: Bearer <your_token>
  ```

### Endpoints

#### Account APIs

| Endpoint                                   | Method  | Description           |
| ------------------------------------------ | ------- | --------------------- |
| `/api/account/register/`                   | POST    | Register new user     |
| `/api/account/login/`                      | POST    | User login            |
| `/api/account/logout/`                     | POST    | User logout           |
| `/api/account/change-password/`            | POST    | Change password       |
| `/api/account/profile/`                    | GET/PUT | Get or update profile |
| `/api/account/reset-password/request-otp/` | POST    | Request OTP           |
| `/api/account/reset-password/verify-otp/`  | POST    | Verify OTP            |
| `/api/account/reset-password/reset/`       | POST    | Reset password        |

#### CMS APIs

| Endpoint            | Method | Description            |
| ------------------- | ------ | ---------------------- |
| `/api/cms/`         | GET    | Get CMS data           |
| `/api/cms/contact/` | POST   | Submit contact message |

---

## Deployment

* Default DB: SQLite (no setup needed)
* For production, configure PostgreSQL/MySQL in `settings.py`
* Collect static files:

  ```bash
  python manage.py collectstatic
  ```
* Deploy with Gunicorn + Nginx (Linux) or use Render/Heroku

---


