const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/songs', require('./routes/api/songs'));
app.use('/api/playlists', require('./routes/api/playlists'));
app.use('/api/users', require('./routes/api/users'));

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
})