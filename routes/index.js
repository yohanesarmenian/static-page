const express = require('express')
const router = express.Router()

let users = require('../db/users.json')

let isLogin = false


router.get('/game', (req, res) => {
    if(isLogin){
      res.status(200).render('game')
    } else{
        res.redirect('/login')
    }
})

router.post('/login', (req, res) => {
    const{
        email,
        password
    } = req.body
    
    users.forEach((data, i) => {
        if(email === data.email && password === data.password){
            isLogin = true
            res.status(200).redirect('/game')
        } else{
            res.render('login')
        }
        
    })
})

router.get('/registrasi', (req, res) => {
    if(isLogin){
        res.status(200).render('game')
    } else{
        res.render('registrasi')
    }
})

router.get('/login',(req, res) => {
    if(isLogin){
        res.status(200).redirect('/game')
    } else {
        res.render('login')
    }
})

router.post('/register', (req, res) => {
    const{
        email,
        password
    } = req.body

    if (users.find(user => user.email === email)) {

        res.render('register', {
            message: 'User already registered.',
            messageClass: 'alert-danger'
        });

        return;
    } else{

        const id = users.length === 0 ? 1 : users[users.length -1].id +1
    
        const user = {
            id,
            email,
            password
        }
        res.redirect('/login')
        
        users.push(user)
        res.status(200).json(user)

    }


})

//--------------Admin tools----------------------

router.get('/api/v1/register', (req, res) => {
    res.status(200).json(users)
})


module.exports = router