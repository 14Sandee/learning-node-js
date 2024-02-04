const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
    console.log('DB connection successful!');
});

// const testTour = new Tour({
//     name: 'The Park Camper',
//     price: 997
// })

// testTour.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log('ERROR: ', err);
// })

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});