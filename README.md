# 🇧🇩 ForceGuard-Bangladesh

## Overview

**ForceGuard-Bangladesh** is a web-based platform that helps users locate Army Camps and Police Stations across Bangladesh. It provides detailed information including addresses and phone numbers using an interactive map interface.

## 🔍 Features

- 🗺️ **Interactive Maps** — Built with Leaflet.js and React-Leaflet for smooth visualization of locations.
- 📦 **Efficient Data Management** — Powered by MongoDB and Mongoose for storing location data.
- ⚡ **Optimized Performance** — Integrated with React Query for smart data fetching and caching.
- 🔔 **Real-time Alerts** — Uses React Hot Toast for quick updates and user notifications.
- 🧭 **Clustered Map Markers** — Enhanced with MarkerCluster for better UX in dense areas.

## 🛠️ Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **State Management**: React Query
- **Map & Geo Tools**: Leaflet, React-Leaflet, MarkerCluster
- **Deployment**: Vercel (Frontend + Backend)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16+)
- MongoDB
- Git

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tariqul420/forceguard-bangladesh.git
   cd forceguard-bangladesh

   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```sh
   MONGODB_URI=your_mongo_db_uri
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| GET    | `/api/armies`  | Get all army camps     |
| GET    | `/api/polices` | Get all police station |

## Scripts

- **`npm run dev`**: Start the development server using Next.js Turbopack.
- **`npm run build`**: Build the Next.js application for production.
- **`npm run start`**: Start the production server.
- **`npm run lint`**: Run ESLint to check code quality.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any queries, please contact [Gmail](tariqul.developer@gmail.com).
[Facebook](https://www.facebook.com/tariqul.islam.fb) || [Github](https://github.com/tariqul420) || [Linkedin](https://www.linkedin.com/in/tariqul-420-t) || [WhatsApp](https://api.whatsapp.com/send?phone=8801743892058)
