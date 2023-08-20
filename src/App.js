import logo from './logo.svg';
import './App.css';
import Expanses from './components/expanse';
import {Route,Routes} from "react-router-dom";
import Incomes from './components/income';
import Home from './components/home';
import NavBar from './components/navbar';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      {/* <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path="/incomes" element={<Incomes></Incomes>}></Route>
        <Route path="/expanse" element={<Expanses></Expanses>}></Route>
      </Routes> */}
    </div>
  );
}

export default App;