"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Card({ _id, title, price, description, imageUrl }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 100;
  const isDescriptionLong = description.length > maxDescriptionLength;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Link
      className="relative bg-white shadow-lg rounded-lg overflow-hidden mb-4 w-full max-w-sm sm:min-w-96 xl:min-w-96 mx-auto"
      href={`/menu/${_id}`}
    >
      <div className="flex flex-col sm:flex-row p-4">
        <div className="relative w-full sm:w-1/3 h-48 sm:h-auto">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <button className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
            Agregar
          </button>
        </div>
        <div className="w-full sm:w-2/3 pl-0 sm:pl-4 mt-4 sm:mt-0">
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-semibold flex-1">{title}</h2>
            <button className="text-2xl text-red-500 hover:text-red-700">
              ♥
            </button>
          </div>
          <p className="text-lg font-bold mb-2">{price}</p>
          <p className="text-gray-700 mb-4">
            {isExpanded
              ? description
              : description.substring(0, maxDescriptionLength) +
                (isDescriptionLong ? "..." : "")}
            {isDescriptionLong && (
              <button
                onClick={handleToggleExpand}
                className="text-blue-500 hover:underline ml-2"
              >
                {isExpanded ? "Leer menos" : "Leer más"}
              </button>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
