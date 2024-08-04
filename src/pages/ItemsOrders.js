import React, { useState } from 'react';
import AddTable from '../components/ItemsOrders/AddTable';
import ShowTable from '../components/ItemsOrders/ShowTable';

export default function ItemsOrders() {
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleShowTable = () => {
    setCurrentComponent('ShowTable');
  };

  const handleAddTable = () => {
    setCurrentComponent('AddTable');
  };

  return (
    <div className="container">
      <h1>This is the ItemsOrders page</h1>
      <button type="button" className="btn btn-primary" onClick={handleShowTable}>Show Table</button>
      <button type="button" className="btn btn-primary" onClick={handleAddTable}>Add Table</button>

      <div className="mt-3">
        {currentComponent === 'ShowTable' && <ShowTable />}
        {currentComponent === 'AddTable' && <AddTable />}
      </div>
    </div>
  );
}
