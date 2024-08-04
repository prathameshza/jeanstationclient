// src/App.js
import {Routes,Route,BrowserRouter,Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import ItemsOrders from "./pages/ItemsOrders";
import ItemsView from "./pages/ItemsView";
import Items from "./pages/Items";
import Signup from './pages/Signup';
import Admins from "./pages/Admins";


function ProtectedRoute({ children, allowEmployee = false }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const isEmployee = localStorage.getItem('isEmployee') === 'true';

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowEmployee && !isEmployee) {
    return <Navigate to="/" />;
  }

  return children;
}


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ItemsOrders" element={<ItemsOrders />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Store/ItemsView" element={<ItemsView />} />
          <Route path="/Items" element={<Items />} />
          <Route path="/Admins" element={<ProtectedRoute allowEmployee={true}><Admins /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
