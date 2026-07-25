# Blood Connect Nepal

Blood Connect Nepal is a web application designed to bridge the gap between blood donors and those in need of blood across various districts in Nepal. It provides a platform for users to register as donors, track their availability, and for individuals or hospitals to post urgent blood requests.

## Tech Stack

The project is divided into two main parts:
- **Frontend:** React, Vite, Tailwind CSS, React Router, Lucide React
- **Backend:** Django, Django REST Framework, SQLite (Development)

## Features

- **User Authentication:** Secure registration and login for users.
- **Donor Profiles:** Users can register as donors, providing their blood group, district, phone number, and availability status.
- **Blood Requests:** Users can create blood requests specifying the required blood group, hospital name, urgency level, and patient details.
- **Search & Filter:** Find available donors based on blood group and district.
- **Urgency Levels:** Blood requests can be categorized into High, Medium, and Low urgency.

## Prerequisites

Make sure you have the following installed on your local development machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Python](https://www.python.org/) (3.10 or higher recommended)
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd blood_connect_nepal
```

### 2. Backend Setup (Django)

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

Install the dependencies (if a `requirements.txt` is provided, otherwise you may need to install django and djangorestframework manually):

```bash
pip install django djangorestframework django-cors-headers
```

Apply database migrations:

```bash
python manage.py migrate
```

Run the development server:

```bash
python manage.py runserver
```

The backend server will run at `http://127.0.0.1:8000/`.

### 3. Frontend Setup (React + Vite)

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application will usually run at `http://localhost:5173/`.

## Folder Structure

```
blood_connect_nepal/
│
├── backend/                # Django backend application
│   ├── api/                # Django app for REST API endpoints and models
│   ├── core/               # Django project settings
│   ├── manage.py           # Django command-line utility
│   └── venv/               # Python virtual environment (if created locally)
│
└── frontend/               # React frontend application
    ├── src/
    │   ├── components/     # Reusable React components (Navbar, DonorCard, etc.)
    │   ├── App.jsx         # Main React component
    │   ├── main.jsx        # Entry point for React
    │   └── index.css       # Global styles and Tailwind directives
    ├── package.json        # Frontend dependencies and scripts
    ├── tailwind.config.js  # Tailwind CSS configuration
    └── vite.config.js      # Vite configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open-source and available under the MIT License.
