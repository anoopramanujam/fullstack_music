const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

// define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/songs', require('./routes/api/songs'));
app.use('/api/playlists', require('./routes/api/playlists'));
app.use('/api/users', require('./routes/api/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
})