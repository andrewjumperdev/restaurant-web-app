"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';

const MenuContext = createContext();

export const useMenu = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVegan, setShowVegan] = useState(false);
  const [showHealthy, setShowHealthy] = useState(false);

  // Fetch the menu data when the component mounts
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Function to reset the filters (i.e., show the full menu)
  const resetFilters = () => {
    setShowVegan(false);
    setShowHealthy(false);
  };

  // Apply the filters based on the user's selection (showVegan or showHealthy)
  const filteredMenuItems = menuItems.filter((item) => {
    if (showVegan) {
      return item.category === "vegan and healthy";
    } else if (showHealthy) {
      return item.category === "healthy";
    }
    return true; // No filters applied, show the full menu
  });

  return (
    <MenuContext.Provider 
      value={{ 
        menuItems: filteredMenuItems, // Provide the filtered menuItems
        loading, 
        showVegan, 
        setShowVegan, 
        showHealthy, 
        setShowHealthy,
        resetFilters // Expose the resetFilters function
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};