import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler (request: NextApiRequest, response: NextApiResponse)  {

  if (request.method === "POST") {
    try {
      const { year, page, genre } = request.body;

      // Check if API key exists
      if (!process.env.MOVIE_API_KEY) {
        console.error("MOVIE_API_KEY is not set");
        return response.status(500).json({ error: "API key not configured" });
      }

      const options = {
        method: 'GET',
        hostname: 'moviesdatabase.p.rapidapi.com',
        port: null,
        path: `/titles/x/upcoming?page=${page || 1}`,
        headers: {
          'x-rapidapi-key': process.env.MOVIE_API_KEY,
          'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
        }
      };

      console.log("Fetching from MoviesDatabase:", options.path);
      console.log("API Key present:", !!process.env.MOVIE_API_KEY);

      const https = require('https');

      return new Promise((resolve) => {
        const req = https.request(options, function (res: any) {
          const chunks: any[] = [];

          res.on('data', function (chunk: any) {
            chunks.push(chunk);
          });

          res.on('end', function () {
            try {
              const body = Buffer.concat(chunks);
              const responseData = JSON.parse(body.toString());
              
              console.log("MoviesDatabase Response Status:", res.statusCode);

              if (res.statusCode !== 200) {
                console.error("API Error:", responseData);
                return resolve(response.status(res.statusCode).json({ error: "Failed to fetch from MoviesDatabase", details: responseData }));
              }

              // Transform MoviesDatabase response to our format
              const movies: MoviesProps[] = (responseData.results || []).map((movie: any) => ({
                id: movie.id,
                primaryImage: {
                  url: movie.primaryImage?.url || '/placeholder.jpg'
                },
                titleText: {
                  text: movie.titleText?.text || "Unknown"
                },
                releaseYear: {
                  year: (movie.releaseYear?.year || movie.releaseDate?.year || new Date().getFullYear()).toString()
                }
              }));

              // Remove duplicate movies by ID
              const uniqueMovies = Array.from(
                new Map(movies.map(movie => [movie.id, movie])).values()
              );

              return resolve(response.status(200).json({ movies: uniqueMovies }));
            } catch (error) {
              console.error("Parse Error:", error);
              return resolve(response.status(500).json({ error: "Failed to parse response", message: error instanceof Error ? error.message : "Unknown error" }));
            }
          });
        });

        req.on('error', (error: any) => {
          console.error("Request Error:", error);
          return resolve(response.status(500).json({ error: "Request failed", message: error.message }));
        });

        req.end();
      });

    } catch (error) {
      console.error("API Route Error:", error);
      return response.status(500).json({ error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" });
    }
  } else {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};
