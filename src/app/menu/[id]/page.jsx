"use client";
import Comments from "@/app/components/Comments";
import Rating from "@/app/components/Rating";
import { Spinner } from "@/app/components/Spinner";
import { useMenu } from "@/context/MenuContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();

  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { menuItems, load } = useMenu();

  useEffect(() => {
    if (id) {
      fetch(`/api/menu/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setMenuItem(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching menu item:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const relatedProducts = menuItems;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!menuItem) {
    return <p>Item not found</p>;
  }

  return (
    <div className="max-w-4xl min-h-screen mx-auto my-8 p-6 bg-white rounded-lg">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 lg:pr-6">
          <img
            src={menuItem.imageUrl}
            alt={menuItem.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-6 mt-6 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">{menuItem.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{menuItem.price}</p>
          <h3 className="text-gray-700 mt-4">Ingredients: </h3>
          <p className="text-gray-700 mt-2">{menuItem.description}</p>
          <p className="text-sm text-gray-500 mt-2">{menuItem.category}</p>
          <div className="mt-6 flex items-center">
            <button className="mr-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Add to Cart
            </button>
            <Link
              href={"/"}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
      <Rating menuItemId={menuItem._id}/>
      <Comments comments={menuItem.reviews || []}/>
      <div className="max-w-7xl mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium">{product.title}</h3>
                <p className="text-gray-600">{product.price}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
