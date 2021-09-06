const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const routes = require('./routes/index');

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

// Routes
app.use('/api', routes);

// PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Listen on port : ', PORT);
})

// For deployment
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'front_end/build')));
    app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname, 'front_end', 'build', 'index.html'))});
}