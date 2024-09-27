const path = require('path')
const express = require('express')
const { title } = require('process')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')
// const forecast = require('./utils/forecast')
const request = require('request')

const app = express() 
const port = process.env.PORT || 3000

//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')


// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialspath)


//Setup Static dirname to server
app.use(express.static(publicDirectoryPath)) 

// app.get('', (req, res)=>{
//     res.render('index', {
//         title: 'Weather App',
//         name: 'Jimoh Abubakar Oyetunji'
//     })
// })

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Jimoh Abubakar Oyetunji'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Software Engineer',
        name: 'Jimoh Abubakar Oyetunji'
    })
})

app.get('', ( req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Use this site to get your weather!.'

    })

})


//      CHALLENGE
//1. Require geocode/forecast in to app.js
//2. Use the address  to geocode
//3. Use the coordinate to forecast
//4. Send back the real forecast and location
app.get('/weather', (req, res)=>{

    if(!req.query.address){
      return res.send({
        error:'Try to provide an address'
    })
    }
      geocode(req.query.address, (error, { latitude, longitude, location }={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })
      })


    //    res.send({
    //         forcast: 'It is snowing',
    //         location: 'Lagos nigeria',
    //         address: req.query.address
    //     })
    
    
    })
    app.get('/indoor', (req, res) =>{
        if(req.query.duration){
            res.send({
                name: 'Abubakar Oyetunji',
                age: 29,
                Gender: 'Male',
                duration: req.query.duration
            })
        }else{
            res.send('vscavaASTFASasfgasa')
        }
        
    })
    

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Jimoh Abubakar Oyetunji',
        errorMessage: 'Help article not found'
      })
})

app.get('*', (req, res)=>{
  res.render('404', {
    title: '404',
    name: 'Jimoh Abubakar Oyetunji',
    errorMessage: 'page not found'
  })
})


app.listen(port, ()=>{
    console.log('Server is up on port  '+ port)
})

