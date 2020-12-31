import logo from './logo.svg';
import './App.css';
import TopNav from './components/topnav';
import { Routes } from './components/routes';

function App() {
  if(!localStorage['checkout']){
    localStorage.setItem('checkout',JSON.stringify([]))
  }
  return (
    <div className="App">
      <Routes/>
    </div>
  );
}

export default App;
