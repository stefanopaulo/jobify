const { render } = require('ejs')
const express = require('express')
const app = express()

const sqlite = require('sqlite')
const dbConnection = sqlite.open('database.sqlite', { Promise })

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async (req, res) => {
    const db = await dbConnection
    const categories = await db.all('select * from categories')
    
    res.render('home', {
        categories
    })
})

app.get('/vaga', (req, res) => {
    res.render('vaga')
})


const init = async () => {
    const db = await dbConnection
    await db.run('create table if not exists categories(id INTEGER PRIMARY KEY, category TEXT)')
    // const category = 'Marketing team'
    // await db.run(`insert into categories(category) values('${category}')`)
}
init()

app.listen(3000, err => {
    if(err) {
        console.log('Não foi possivel iniciar o servidor do Jobify.')
    } else {
        console.log('Servidor do Jobify rodando...')
    }
})
