import logo from './logo.svg';
import './App.css';
import TopNav from './components/topnav';
import { Routes } from './components/routes';
import { States } from './components/states';
import React from 'react'
function App() {
  if(!localStorage['checkout']){
    localStorage.setItem('checkout',JSON.stringify([]))
  }
  const [orders,setOrders]=React.useState(JSON.parse(localStorage['checkout']));
  return (
    
    <div className="App">
      
      <Routes/>
     
    </div>
    
    
  );
}

export default App;
