# AI Automation Tool

A modern web application for automating video content workflows using AI capabilities. Built with Next.js, FastAPI, and Celery.

## 🌟 Core Features

- **Visual Workflow Builder**: Create complex automation workflows with an intuitive drag-and-drop interface
- **AI-Powered Content Generation**: Automatically generate video captions, thumbnails, and content summaries
- **Customizable Triggers**: Set up automated workflows that respond to various events
- **Stripe Integration**: Secure payment processing for premium features
- **Modern UI/UX**: Built with Tailwind CSS and Radix UI components
- **Authentication**: Secure user authentication system

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.0
- **UI Libraries**:
  - Tailwind CSS for styling
  - Radix UI components
  - Framer Motion for animations
  - Shadcn UI components
- **State Management**: Redux Toolkit
- **Flow Visualization**: XY Flow
- **Payment Processing**: Stripe
- **Authentication**: NextAuth.js

### Backend

- **Framework**: FastAPI
- **Task Queue**: Celery with Redis
- **Database**: PostgreSQL with SQLModel
- **Dependencies**:
  - Python 3.x
  - SQLAlchemy
  - Pydantic
  - Uvicorn

## 🚀 Getting Started

### Prerequisites

- Node.js
- Python 3.x
- PostgreSQL
- Redis

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with necessary environment variables:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set up environment variables in `.env`

5. Run the server:

```bash
uvicorn main:app --reload
```

## 🐳 Docker Support

The project includes Docker support for easy deployment. Use docker-compose to run all services:

```bash
docker-compose up
```

## 📝 License

[MIT License](LICENSE)
