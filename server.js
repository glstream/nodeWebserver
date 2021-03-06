const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials')

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path}`
    fs.appendFile('server.log', log+ '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintence.hbs', {
//         maintence: 'The webiste is under maintence'
//     });
//     next();

// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIT', (text) => {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    res.render('index.hbs', {
        welcome: 'Welcome to the homepage',
        pageTitle: 'HomePage'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    });
})

app.get('/projects', (req, res) =>{
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
});

app.get('/bad', (req, res)=>{
    res.send({

        error: 'unable to handle'
        });
    
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});