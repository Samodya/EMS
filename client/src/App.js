import './App.css';
import './assets/css/fonts.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
