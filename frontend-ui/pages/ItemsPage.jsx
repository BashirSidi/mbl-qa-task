import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, fetchItems } from "../store/slices/itemSlice";
import Loader from "../components/Loader";
import {Link} from "react-router-dom";
import ConfirmAlert from "../components/ConfirmAlert";
import {toast} from "react-toastify";

const ItemsPage = () => {
  const dispatch = useDispatch();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [id, setId] = useState(false);
  const {items, isLoading} = useSelector((state) => state.items);
  
  const handleDeleteClick = (id) => {
     setId(id)
    setIsAlertVisible(true); 
  };

  const handleConfirm = () => {
    dispatch(deleteItem(id))
      .unwrap()
      .then(() => {
        toast.success("Item deleted successfully!");
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        toast.error("Item deletion failed: " + (err?.message || "Unknown error"));
      });
    setIsAlertVisible(false);
  };

  const handleCancel = () => {
    setIsAlertVisible(false);
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div className="p-6">
      <ConfirmAlert
        message="Are you sure you want to delete this item ?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isVisible={isAlertVisible}
      />
      {isLoading && <Loader />}
      <div className="container mx-auto">
        <h3 className="text-center text-3xl mt-20 leading-8 text-black font-bold tracking-wide uppercase">
          Items Page
        </h3>
        <div className="flex items-center mt-24 mb-10">
          <div className="flex-grow text-left px-4 py-2 m-2">
            <h5 data-testid="items" className="text-gray-900 font-bold text-xl">Items Listing</h5>
          </div>
          <div className="flex-grow text-right px-4 py-2 m-2">
            <Link to="/items/create">
              <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                <span className="pl-2">New item</span>
              </button>
            </Link>
          </div>
        </div>
        {items.map((item) => (
        <div className="flex items-center bg-gray-100 mb-10 shadow" key={item.id}>
          <div className="flex-auto text-left px-4 py-2 m-2">
            <span className="text-gray-900 leading-none font-bold me-5">{item.name}:</span>
            <span className="text-gray-900 leading-none">{item.description}</span>
          </div>
          <div className="flex-auto text-right px-4 py-2 m-2">
            <Link to={`/items/${item.id}`}>
              <button title="Edit" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
            </Link>
            <button title="Remove" onClick={() => handleDeleteClick(item.id)} className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ItemsPage;
