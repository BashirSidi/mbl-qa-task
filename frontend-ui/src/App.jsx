import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

import PrivateRoute from '../components/PrivateRoute';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ItemsPage from '../pages/ItemsPage';
import AddItemPage from '../pages/addItemPage';
import EditItemPage from '../pages/editItemPage';

function App() {

  return (
    <>
      <Router>
        <div className="container mx-auto p-4">
          <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/items" element={<PrivateRoute element={<ItemsPage />} />} />
          <Route path="/items/create" element={<PrivateRoute element={<AddItemPage />} />} />
          <Route path="/items/:id" element={<PrivateRoute element={<EditItemPage />} />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
