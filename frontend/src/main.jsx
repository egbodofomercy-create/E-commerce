import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from "./context/ShopContext";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopContextProvider>
        <App />
        <Toaster position="top-right" />
  </ShopContextProvider>
    
  </BrowserRouter>,
)
