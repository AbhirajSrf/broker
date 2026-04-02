import React, { useEffect } from "react";
import { usePropertyStore } from "../store/usePropertyStore";
import { useAuthStore } from "../store/useAuthStore";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { CiStar } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import Navbar from "../components/Navbar";

const Favourites = () => {
  const {
    favouriteProperties,
    isLoading,
    fetchFavourites,
    toggleFavourite,
    toggleLike,
  } = usePropertyStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 mt-8 pb-10">
        <h1 className="text-xl font-bold text-gray-800 mb-5">
          Your Favourites
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : favouriteProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
            <CiStar size={48} />
            <p className="text-lg">No favourites yet</p>
            <p className="text-sm">Properties you favourite will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favouriteProperties.map((property) => {
              const isLiked =
                property._liked ??
                property.likes?.some(
                  (id) => id?.toString() === authUser?._id?.toString()
                );
              const isFavourited =
                property._favourited ??
                property.favourites?.some(
                  (id) => id?.toString() === authUser?._id?.toString()
                );

              return (
                <div
                  key={property._id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-44 bg-gray-100">
                    {property.images?.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                        No Image
                      </div>
                    )}

                    {/* Favourite button */}
                    <button
                      onClick={() => toggleFavourite(property._id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm"
                    >
                      {isFavourited !== false ? (
                        <FaStar size={15} className="text-blue-500" />
                      ) : (
                        <CiStar size={15} className="text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-semibold text-gray-800 truncate">
                        {property.title}
                      </h2>
                      <span className="text-blue-600 font-bold text-sm whitespace-nowrap">
                        ${property.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <MdLocationOn size={12} />
                      <span className="truncate">{property.location}</span>
                    </div>

                    {/* Beds / Baths */}
                    <div className="flex gap-3 mt-2 text-gray-500 text-xs">
                      <div className="flex items-center gap-1">
                        <IoBedOutline size={13} />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IoWaterOutline size={13} />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                    </div>

                    {/* Property Type */}
                    {property.propertyType && (
                      <div className="mt-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                          {property.propertyType}
                        </span>
                      </div>
                    )}

                    {/* Like */}
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => toggleLike(property._id)}
                        className="hover:scale-110 transition-transform"
                      >
                        {isLiked ? (
                          <FaHeart size={16} className="text-red-500" />
                        ) : (
                          <FiHeart size={16} className="text-gray-400" />
                        )}
                      </button>
                      <span className="text-gray-400 text-xs">
                        {property.likes?.length || 0} likes
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
