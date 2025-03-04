# BD Army Camp And Police Station Location & Phone Number

## Introduction

BD Army Camp and Police Station is a web-based platform designed to manage and visualize army camp locations, track activities, and enhance operational efficiency using interactive maps.

## Features

- **Interactive Maps**: Uses Leaflet.js and React-Leaflet for visualizing army camp locations.
- **Data Management**: Stores and retrieves data using MongoDB and Mongoose.
- **Optimized Performance**: Uses React Query for efficient data fetching and caching.
- **Real-time Notifications**: Uses React Hot Toast for displaying updates and alerts.
- **Clustered Markers**: Enhances map visualization with Leaflet MarkerCluster.

## Technologies Used

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **State Management**: React Query
- **Maps & Geo Location**: Leaflet, React-Leaflet, MarkerCluster
- **Deployment**: Vercel (Frontend), Vercel (Backend)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+)
- MongoDB
- Git

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/tariqul420/bd-army-police.git
   cd bd-army-police
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
