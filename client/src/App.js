import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useState } from 'react';

function App() {
  const [isAunthenticated, setIsAuthenticated]= useState();
  return (
    <div className='container'>
      <Router>
         <Routes>
           <Route path='/' element={<SignUp />}/>
           <Route path='/login' element={<Login />} />
           <Route path='/dashboard' element={<Dashboard />} />
         </Routes>
      </Router>
    </div>
  );
}

export default App;
