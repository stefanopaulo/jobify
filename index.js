const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log(new Date())
    res.send('Hello Wolrd')
})

app.listen(3000, err => {
    if(err) {
        console.log('Não foi possivel iniciar o servidor do Jobify.')
    } else {
        console.log('Servidor do Jobify rodando...')
    }
})
