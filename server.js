const express = require('express');
const connectToDB = require('./config/database');

const app = express();

// :connect to database
connectToDB();

// :init middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API running ...'));

// :define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/center', require('./routes/center'));
app.use('/api/demand', require('./routes/demand'));
app.use('/api/donor', require('./routes/donor'));
app.use('/api/report', require('./routes/report'));

const PORT = process.env.PORT || 1200;

app.listen(PORT, () => console.log(`server started on port ${PORT} ...`));