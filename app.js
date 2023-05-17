import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import registrationRoutes from './routes/registrationRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

if ((process.env.ENVIRONMENT || 'development') === 'development') {
    app.use(cors())
}

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/registration', registrationRoutes);

app.use((req, res, next) => {
    res.render('pages/404');
})

app.listen(process.env.PORT || 3000);