const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i < 200; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '63a065f64012a1f7af4b232e',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images: [{
                url: `https://source.unsplash.com/random/300x300?camping,${i}`,
                filename: `demo-${i}`
            }],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae libero, eligendi deserunt magnam illum maxime, molestiae consequatur dolorem dicta repellendus nisi tenetur distinctio numquam ipsum? Reiciendis at enim numquam suscipit?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            }
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})