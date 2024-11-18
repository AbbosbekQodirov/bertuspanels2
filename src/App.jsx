import React, { useEffect } from 'react'
import Routers from './routers/Routers'
import { BrowserRouter } from 'react-router-dom'
import "./App.css"
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routers />
        <ToastContainer autoClose={2000} />
      </BrowserRouter>
    </div>
  );
}

export default App