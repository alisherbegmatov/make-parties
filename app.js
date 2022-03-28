// Initialize express
const express = require('express')
const app = express()

// require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Use "main" as our default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// Render the "home" layout for the main page and send the following msg
// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Handlebars are Cool!' });
// })

// OUR MOCK ARRAY OF PROJECTS
var events = [
    { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://cdn2.photostockeditor.com/t/2812/animal-raccoon-walking-on-lawn-grass-raccoon-raccoon-image.jpg" },
    { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://cdn2.photostockeditor.com/t/2812/animal-raccoon-walking-on-lawn-grass-raccoon-raccoon-image.jpg" },
    { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://cdn2.photostockeditor.com/t/2812/animal-raccoon-walking-on-lawn-grass-raccoon-raccoon-image.jpg" }
  ]

  // INDEX
app.get('/', (req, res) => {
  res.render('events-index', { events: events });
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
