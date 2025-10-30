const express = require('express');
const app = express();
const nurseRoutes = require('./routes/nurseRoutes');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/nurses', nurseRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));