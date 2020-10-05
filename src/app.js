const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'Bibek Raj Paudel'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About page',
        name:'Bibek Raj Paudel'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name:'Bibek Raj Paudel'

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error:'You should provide the address of which you want to know weather of'
        }  
        
        )
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
          return  res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData ) => {
            if (error) {
                return res.send({error})
            }

            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({

        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Bibek Raj Paudel',
        errormessage:'Help article not found'


    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Bibek Raj Paudel',
        errormessage:'Page not found'


    })
})

app.listen(3000, () => {
    console.log('Server is upon the port 3000')
})