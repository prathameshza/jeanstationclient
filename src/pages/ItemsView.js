import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarGeneric from '../components/ItemsView/NavbarGeneric';
import CardGrid from '../components/ItemsView/CardGrid';

export default function ItemsView() {
  const [itemcards, setItemcards] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://localhost:7120/api/Items');
      const items = response.data.map(item => ({
        img: item.itemImage,
        title: item.itemName,
        text: `Price: ${item.price} - Quantity: ${item.quantity} - Store ID: ${item.storeId}`
      }));
      setItemcards(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <>
      <NavbarGeneric />
      <br />
      <CardGrid cards={itemcards} />
    </>
  );
}
