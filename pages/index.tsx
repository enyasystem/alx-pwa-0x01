import Button from "@/components/commons/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MoviesProps } from "@/interfaces";

const Home: React.FC = () => {
  const router = useRouter();
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "/3d-rendering-person-watching-movie-with-popcorn.jpg"
  );
  const [heroMovie, setHeroMovie] = useState<MoviesProps | null>(null);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const response = await fetch("/api/fetch-movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: 1, year: "", genre: "" }),
        });

        if (response.ok) {
          const data = await response.json();
          const firstMovie = data.movies?.[0];
          
          if (firstMovie && firstMovie.primaryImage?.url) {
            setHeroMovie(firstMovie);
            setBackgroundImage(firstMovie.primaryImage.url);
          }
        }
      } catch (error) {
        console.error("Failed to fetch hero movie:", error);
      }
    };

    fetchHeroMovie();
  }, []);

  return (
    <div className="bg-[#171D22] text-white">
      <section
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("/3d-rendering-person-watching-movie-with-popcorn.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#171D22",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Discover Your Next Favorite{" "}
            <span className="text-[#E2D609]">Movie</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl">
            Explore the latest blockbuster movies, critically acclaimed films,
            and your personal favorites – all in one place.
          </p>
          <Button
            title="Browse Movies"
            action={() => router.push("/movies", undefined, { shallow: false })}
          />
        </div>
      </section>

      <section className="py-16 px-8 md:px-44 bg-[#121018] text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-8">
          Join CineSeek Now!
        </h2>
        <p className="text-lg md:text-2xl mb-12">
          Sign up today to get access to the latest movies, exclusive content,
          and personalized movie recommendations.
        </p>
        <Button title="Get Started" />
      </section>
    </div>
  );
};

export default Home;
