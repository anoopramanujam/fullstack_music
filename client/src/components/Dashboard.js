import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, TextField, InputAdornment, Checkbox,  Container,
  FormLabel, FormGroup, FormControlLabel, Grid, Button,
  FormHelperText, FormControl, InputLabel, Input,
} from '../mui';

const Dashboard = () => {
  return (
    <Container maxwidth='sm'>
      <Box>
        <h3>Dashboard</h3>
      </Box>
    </Container>
  )
}

export default Dashboard;