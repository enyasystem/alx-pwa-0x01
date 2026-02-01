import { MovieProps } from "@/interfaces"
import Image from "next/image"
import { useState } from "react"

const MovieCard: React.FC<MovieProps> = ({ title, posterImage, releaseYear }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="h-[563px]">
      <div className="bg-gray-800 rounded-md overflow-hidden h-[430px] flex items-center justify-center">
        {!imageError && posterImage && posterImage !== '/placeholder.jpg' ? (
          <Image 
            className="w-full h-full object-cover hover:cursor-pointer" 
            src={posterImage} 
            width={300} 
            height={430} 
            alt={title}
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 text-sm">No Image Available</p>
              <p className="text-gray-500 text-xs mt-2">{title}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between py-4">
        <p className="text-xl font-bold truncate">{title}</p>
        <p className="text-xl text-[#E2D609]">{releaseYear}</p>
      </div>
    </div>
  )
}

export default MovieCard
