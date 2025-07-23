# 🎧 iTunes Podcast Search App

This project is a full-stack implementation of a technical assignment designed to evaluate skills in modern web development. It demonstrates building a complete podcast search interface by integrating the iTunes Search API with a custom backend and frontend.

## 📌 Objective

The app allows users to search for podcasts using a keyword. The backend queries the iTunes Search API and stores the results in a database, while the frontend displays the results in a responsive interface.

## ⚙️ Tech Stack

### Backend
- **Language:** TypeScript
- **Framework:** NestJS
- **HTTP Client:** Axios
- **Database:** PostgreSQL (via TypeORM)
- **API Source:** [iTunes Search API](https://itunes.apple.com/search)

### Frontend
- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **Rendering:** App Router with Server Components (Next.js 13+)

### DevOps & Tooling
- Node.js
- ESLint + Prettier
- Environment-ready for AWS deployment

---

## 🚀 Features

- `GET /api/search?term=yourKeyword` RESTful API endpoint
- Stores podcast results in PostgreSQL
- Avoids redundant searches by caching previous queries
- Frontend page to search and view podcast results
- Responsive UI using Tailwind CSS
- Optimized build with TypeScript strict mode

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/itunes-podcast-search.git
cd itunes-podcast-search/frontend

# Install dependencies
npm install
