"use client";
import React, { useState } from "react";
import Card from "./Card";
import { useMenu } from "@/context/MenuContext";
import { Spinner } from "./Spinner";

const Menu = () => {
  const {menuItems, loading, showVegan, showHealthy } = useMenu();

  if (loading) {
    return(
        <div className="flex justify-center items-center min-h-screen">
            <Spinner />
        </div>       
      )
  }

  const veganFood = menuItems.filter((item) => item.category === "vegan and healthy")
  const healthyFood = menuItems.filter((item) => item.category === "healthy");

  const filteredItems = showVegan
    ? veganFood
    : showHealthy
    ? healthyFood
    : menuItems;

  return (
    <div className="flex flex-col">
      <div className="p-4 flex flex-wrap">
        {filteredItems.map((card, index) => (
          <Card
             key={index}
            _id={card._id}
            title={card.title}
            price={card.price}
            description={card.description}
            imageUrl={card.imageUrl}
            style={{ objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
