const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "65ae634326cdb04ce0657eab",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:
                [
                    {
                        url: 'https://res.cloudinary.com/dhmmuol3x/image/upload/v1719549422/YelpCamp/twad0zeit1yujpahs7fr.jpg',
                        filename: 'YelpCamp/twad0zeit1yujpahs7fr'
                    },
                    {
                        url: 'https://res.cloudinary.com/dhmmuol3x/image/upload/v1719499791/YelpCamp/pjcwhj5i5qmq8r1txqqx.jpg',
                        filename: 'YelpCamp/pjcwhj5i5qmq8r1txqqx'
                    },
                    {
                        url: 'https://res.cloudinary.com/dhmmuol3x/image/upload/v1719548109/YelpCamp/taxcjpbznb6gx382iqla.jpg',
                        filename: 'YelpCamp/taxcjpbznb6gx382iqla'
                    }
                ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})