const express = require('express')
const app = express()
const port = 3000

const router = require('./routes/index')
const morgan = require('morgan')
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");


app.use(express.json())
app.use(express.urlencoded({ 
    extended: false 
}))


app.use(express.static("public"))

app.set('view engine', 'ejs')

app.use(morgan('dev'))

app.use(router)

//home route
router.get('/', (req, res) => {
    res.render('landing')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })