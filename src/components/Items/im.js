import React, { useState, useEffect } from 'react';
import axios from 'axios';

const generateItemCode = () => {
  // Generates a random 5-character string
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

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
  const [editingItem, setEditingItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file instanceof File) {
      setImageFile(file);
      setForm((prevForm) => ({
        ...prevForm,
        itemImage: URL.createObjectURL(file)
      }));
    } else {
      // Handle case where file is not valid or not present
      setImageFile(null);
      setForm((prevForm) => ({
        ...prevForm,
        itemImage: ''
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let currentForm = { ...form };
    
    // Generate itemCode if it's not in the form (i.e., for new items)
    if (!editingItem) {
      currentForm.itemCode = generateItemCode();
    }
  
    const formData = new FormData();
    for (const key in currentForm) {
      if (key !== 'itemImage') {
        formData.append(key, currentForm[key]);
      }
    }
    if (imageFile) {
      formData.append('ItemImageFile', imageFile);
    }
  
    try {
      if (editingItem) {
        await axios.put(`https://localhost:7120/api/Items/${editingItem.itemCode}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('https://localhost:7120/api/Items', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      await fetchItems();
      resetForm();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };
  

  const handleEdit = (item) => {
    setForm(item);
    setEditingItem(item);
  };

  const handleDelete = async (itemCode) => {
    try {
      await axios.delete(`https://localhost:7120/api/Items/${itemCode}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const resetForm = () => {
    setForm({
      itemCode: '',
      itemName: '',
      price: 0,
      quantity: 0,
      storeId: 0,
      itemImage: ''
    });
    setEditingItem(null);
    setImageFile(null);
  };

  return (
    <div className="container">
      <h1>Item Manager</h1>
      <form onSubmit={handleSubmit}>
        {/* Removed itemCode field */}
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            className="form-control"
            name="itemName"
            value={form.itemName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={form.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Store ID</label>
          <input
            type="number"
            className="form-control"
            name="storeId"
            value={form.storeId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Item Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
          {form.itemImage && <img src={form.itemImage} alt="Item" className="img-thumbnail mt-2" style={{ width: '150px' }} />}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editingItem ? 'Update Item' : 'Add Item'}
        </button>
        <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={resetForm}>
          Cancel
        </button>
      </form>
      <h2 className="mt-5">Items List</h2>
      <div className="row">
        {items.map((item) => (
          <div key={item.itemCode} className="col-md-4">
            <div className="card mb-4">
              <img src={`data:image/jpeg;base64,${item.itemImage}`} className="card-img-top" alt={item.itemName} />
              <div className="card-body">
                <h5 className="card-title">{item.itemName}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <p className="card-text">Quantity: {item.quantity}</p>
                <p className="card-text">Store ID: {item.storeId}</p>
                <button className="btn btn-primary mr-2" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.itemCode)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemManager;
