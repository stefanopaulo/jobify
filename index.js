const { render } = require('ejs')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home', {
        date: new Date()
    })
})

app.listen(3000, err => {
    if(err) {
        console.log('Não foi possivel iniciar o servidor do Jobify.')
    } else {
        console.log('Servidor do Jobify rodando...')
    }
})
