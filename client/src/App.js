import { useSelector } from 'react-redux';
import './App.css';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';

 const App = () => {

  const isAuthenticated = useSelector( (state) => state.auth.isAuthenticated);

  return (    
      <div>
      {
        isAuthenticated ?
        <Dashboard/>
        :
        <LoginScreen/>
      }
      </div>
  );
}

export default App;
