import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import PrivateRoute from '../components/PrivateRoute';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ItemsPage from '../pages/ItemsPage';
import AddItemPage from '../pages/AddItemPage';
import EditItemPage from '../pages/EditItemPage';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/items",
        element: <PrivateRoute element={<ItemsPage />} />,
      },
      {
        path: "/items/create",
        element: <PrivateRoute element={<AddItemPage />} />,
      },
      {
        path: "/items/:id",
        element: <PrivateRoute element={<EditItemPage />} />,
      },
    ],
    {
      future: {
        v7_startTransition: true,
      },
    }
  );

  return (
    <>
      <RouterProvider router={router} />
      <div className="container mx-auto p-4">
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
