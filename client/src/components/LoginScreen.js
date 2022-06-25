import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, TextField, InputAdornment, Checkbox,  Container,
  FormLabel, FormGroup, FormControlLabel, Grid, Button,
  FormHelperText, FormControl, InputLabel, Input,
} from '../mui';
import { authenticate } from '../reducers/authSlice';

const LoginScreen = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const login = () => {
    dispatch(authenticate({userName, password}));
  }

  return (
    <Container maxwidth='sm'>
      <Box>
        <h3>Login Screen</h3>
        <FormLabel component="legend" htmlFor="username" sx={{ pt: 1 }}>Username</FormLabel>
          <TextField
            required
            id="username"
            name="username"
            value={userName}
            size="small"
            sx={{ width: '20ch' }}
            onChange={(e) => setUserName(e.target.value)}
          />        
                <FormLabel component="legend" htmlFor="password" sx={{ pt: 1 }}>Password</FormLabel>
          <TextField
            required
            id="password"
            name="password"
            type="password"
            value={password}
            size="small"
            sx={{ width: '20ch' }}
            onChange={(e) => setPassword(e.target.value)}
          />   
          <br/>
          <Button variant='contained' onClick={login} sx={{ mt:3, mr: 1 }} >
            Submit
          </Button>
      </Box>
    </Container>
  )
}

export default LoginScreen;