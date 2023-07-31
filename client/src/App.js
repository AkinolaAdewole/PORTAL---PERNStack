import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth=(boolean)=>{
    setIsAuthenticated(boolean);
  }

  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path='/' element={!isAuthenticated ? <SignUp  setAuth={setAuth}/> : <Navigate to='/login' />} />

          <Route path='/login' element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to='/dashboard' />} />

          <Route path='/dashboard' element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to='/login' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
