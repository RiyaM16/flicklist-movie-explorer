# Flicklist
A Movie Explorer web app where users can search movies, view details, and save favorites with a personal rating/comment using the TMDB API.

**Live Demo**: 

## Features

- **Search Movies**: Search for movies by title with real-time results
- **Movie Details**: View comprehensive information including poster, overview, release year, runtime, and ratings
- **Favorites**: Save movies to your personal favorites list
- **Personal Ratings**: Rate your favorite movies from 1-5 stars
- **Notes**: Add personal notes and thoughts about each favorite movie
- **Persistent Storage**: Favorites are saved locally and persisted across browser sessions
- **Responsive Design**: Beautiful and clean UI that works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Custom CSS
- **API Integration**: TMDB (The Movie Database) API
- **Data Persistence**: LocalStorage for client-side persistence
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- A TMDB API key (https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd flicklist
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file and add your TMDB API key to `.env.local`:
```
TMDB_API_KEY=your_actual_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add `TMDB_API_KEY` as an environment variable
4. Deploy!

## Technical Decisions & Tradeoffs

### API Proxy Pattern
**Decision**: Implemented a Next.js API route (`/api/movies`) to proxy requests to TMDB.

**Why**: 
- Keeps API key secure on the server side
- Prevents exposure of credentials in client-side code
- Enables request transformation and error handling
- Allows for future caching or rate limiting

**Tradeoff**: Adds a network hop, but security benefit outweighs minimal latency.

### LocalStorage for Persistence
**Decision**: Used browser LocalStorage for favorites persistence.

**Why**:
- No backend database required
- Instant read/write operations
- Simple implementation for MVP
- Works offline
- No authentication needed

**Tradeoff**: 
- Data is device-specific (not synced across devices)
- Limited to ~5-10MB storage
- No multi-user support
- Future scope - Need to implement server-side storage with user accounts

### State Management
**Decision**: Used React hooks (useState) and custom hook (useFavorites) without external state management.

**Why**:
- Application state is relatively simple
- Reduces bundle size and complexity
- Built-in React features are sufficient
- Easy to implement and maintain

**Tradeoff**: For larger applications, Redux or Zustand might be beneficial.

### Component Architecture
**Decision**: Split UI into focused components (SearchBar, MovieCard, MovieModal).

**Why**:
- Separation of concerns
- Reusability
- Easier testing
- Better maintainability

### Modal Implementation
**Decision**: Built custom modal with overlay instead of using a library.

**Why**:
- Full control over styling and behavior
- No additional dependencies
- Lightweight implementation
- Custom CSS and transitions

## Project Structure

```
flicklist/
├── app/
│   ├── api/
│   │   └── movies/
│   │       └── route.ts          # API proxy endpoint
│   ├── components/
│   │   ├── MovieCard.tsx         # Movie card component
│   │   ├── MovieModal.tsx        # Movie details modal
│   │   └── SearchBar.tsx         # Search input component
│   ├── hooks/
│   │   └── useFavorites.ts       # Favorites management hook
│   ├── types/
│   │   └── movie.ts              # TypeScript interfaces
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page component
│   └── styles.css                # Global styles
├── public/                       # Static assets
├── .env.local                    # Store environment variables
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Known Limitations & Future Improvements

### Current Limitations

1. **No User Accounts**: Favorites are device-specific
2. **Basic Search**: No filters (genre, year, rating)
3. **No Pagination**: Only shows first page of search results
4. **LocalStorage Only**: No cross-device sync
5. **Limited Error Recovery**: Could be more robust
6. **No Image Fallback**: Uses placeholder for missing posters
7. **No Loading States**: Some transitions could show loading indicators

### With More Time, I Would Add

**High Priority**:
- User authentication and server-side storage
- Advanced search filters (genre, year, rating range)
- Pagination for search results
- Watchlist in addition to favorites
- Movie recommendations based on favorites
- Export/import favorites functionality

**Medium Priority**:
- Sorting options (by rating, year, title)
- Dark and light mode toggle
- Share favorite lists with friends
- Movie trailers integration
- Similar movies suggestions
- Responsive image optimization

**Nice to Have**:
- Social features (comments, reviews)
- Movie collections/playlists
- Watched/want to watch status
- Statistics dashboard
- Browser extension
- Mobile app (React Native)
- Offline support with service workers

### Performance Optimizations
- Implement image lazy loading
- Add request debouncing for search
- Cache API responses
- Optimize bundle size
- Add CDN for static assets

### Code Quality Improvements
- Add unit tests (Jest, React Testing Library)
- Add E2E tests (Playwright)
- Implement error boundaries
- Add TypeScript strict mode
- Set up ESLint and Prettier
- Add CI/CD pipeline
- Accessibility improvements (ARIA labels, keyboard navigation)

## API Endpoints

### Search Movies
```
GET /api/movies?query=inception
```

### Get Movie Details
```
GET /api/movies?id=27205
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| TMDB_API_KEY | Your TMDB API key | Yes |


