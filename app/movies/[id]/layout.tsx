import {Movie} from "@/interfaces/movie";
import Image from "next/image";
import Link from "next/link";
import {ReactNode} from "react";

async function getMovie(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDZjNTkxYzFjMTE5MTVhZmQ1YTllZjYyOTQxYTQ4MCIsInN1YiI6IjY0YmE2NmRiYWI2ODQ5MDBmZjRhNWZiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Knircj_CKz9gzwV9HCWyvVAZ6uMRRqW37DjtfH6sbF4",
    },
    next: {
      revalidate: 60,
    },
  };

  var movie = await fetch(url, options);

  return movie.json();
}

export default async function MovieId({
  params,
  children,
}: {
  children: ReactNode;
  params: {id: string};
}) {
  const movie: Movie = await getMovie(params.id);
  return (
    <div className="min-h-screen p-100 mt-5 me-10 ms-10">
      <div className="h-[50vh] relative">
        <Image
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          className="object-cover w-full rounded-lg"
          fill
        />
      </div>
      <h1 className="text-4xl font-bold text-center pt-5">{movie.title}</h1>

      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium bg-gray-100 p-5">
          <h1>
            <span className="underline">Homepage:</span>
            <Link href={movie.homepage} target="_blank">
              {" "}
              See more...
            </Link>
          </h1>

          <h1>
            <span className="underline">Original Language:</span>{" "}
            {movie.original_language}
          </h1>

          <p className="text-justify">
            <span className="underline">Overview:</span> {movie.overview}
          </p>

          <p>
            <span className="underline">Release Date:</span>{" "}
            {movie.release_date}
          </p>
        </div>
        <div className="w-1/2">{children}</div>
      </div>
    </div>
  );
}
