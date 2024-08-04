import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    itemCode: '',
    itemName: '',
    price: 0,
    quantity: 0,
    storeId: 0,
    itemImage: ''
  });
  const [editing, setEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://localhost:7120/api/Items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const generateItemCode = () => {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`https://localhost:7120/api/Items/${editItemId}`, form);
      } else {
        const newItem = { ...form, itemCode: generateItemCode() };
        await axios.post('https://localhost:7120/api/Items', newItem);
      }
      fetchItems();
      setForm({
        itemCode: '',
        itemName: '',
        price: 0,
        quantity: 0,
        storeId: 0,
        itemImage: ''
      });
      setEditing(false);
    } catch (error) {
      console.error('Error submitting item:', error);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(true);
    setEditItemId(item.itemCode);
  };

  const handleDelete = async (itemCode) => {
    try {
      await axios.delete(`https://localhost:7120/api/Items/${itemCode}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Item Manager</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            name="itemName"
            value={form.itemName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Store ID</label>
          <input
            type="number"
            name="storeId"
            value={form.storeId}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Item Image URL</label>
          <input
            type="text"
            name="itemImage"
            value={form.itemImage}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editing ? 'Update' : 'Add'} Item
        </button>
      </form>
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4 mb-4" key={item.itemCode}>
            <div className="card">
              <img src={item.itemImage} className="card-img-top" alt={item.itemName} />
              <div className="card-body">
                <h5 className="card-title">{item.itemName}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <p className="card-text">Quantity: {item.quantity}</p>
                <p className="card-text">Store ID: {item.storeId}</p>
                <button onClick={() => handleEdit(item)} className="btn btn-warning mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.itemCode)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemManager;
