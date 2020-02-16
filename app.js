const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys');
const app = express();


mongoose.connect(keys.mongoURI, {
                                  useNewUrlParser: true,
                                  useUnifiedTopology: true,
                                  useCreateIndex: true
                                }) //возвращает promise
    .then(()=> console.log('MongoDB connected'))
    .catch(error => console.log(error));




app.use(passport.initialize());
require('./middleware/passport')(passport);

//плагины:
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));//даст возможность получать доступ к картинкам на прямую в браузере, например localhost:5000/uploads/26012020-193829_967-kotiki-23.jpg
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

//подготовка сервера в продакшен, определяем какой файл первый запускается
if(process.env.NODE_ENV === "production"){
   app.use(express.static('client/dist/client'))

   app.get('*', (req, res)=>{
       res.sendFile(
          path.resolve(
              __dirname, 'client', 'dist', 'client', 'index.html'
          )
       )
   })
}





module.exports = app;