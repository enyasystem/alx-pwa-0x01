# API Key Setup Instructions

## Getting a Valid RapidAPI Key for MoviesDatabase

The 403 Forbidden error indicates the API key is invalid or doesn't have access.

### Steps to get a valid API key:

1. **Go to RapidAPI Website**
   - Visit: https://rapidapi.com/

2. **Sign Up or Log In**
   - Create an account if you don't have one

3. **Search for "MoviesDatabaseAPI"**
   - Search in the RapidAPI hub for the MoviesDatabase API

4. **Subscribe to the API**
   - Click "Subscribe"
   - Choose a plan (free tier available)

5. **Get Your API Key**
   - Go to your RapidAPI Dashboard
   - Navigate to "My apps"
   - Find your API keys
   - Copy the "X-RapidAPI-Key" value

6. **Update .env.local**
   - Open `alx-movie-app/.env.local`
   - Replace the key value with your actual API key:
   ```
   MOVIE_API_KEY=your_actual_api_key_here
   ```

7. **Restart the dev server**
   - Stop the running `npm run dev` (Ctrl+C)
   - Start it again: `npm run dev`

## Troubleshooting

If you still get 403 errors after adding a valid key:

- Verify the API key is correct (copy/paste from RapidAPI)
- Ensure your RapidAPI subscription is active
- Check that you're using the "MoviesDatabase" API (not another movie API)
- Make sure the API key hasn't expired

## Current Status

- API Route: `/pages/api/fetch-movies.ts` ✓
- Environment File: `/alx-movie-app/.env.local` ✓
- Movies Page: `/pages/movies/index.tsx` ✓

The code is ready; it just needs a valid API key!
