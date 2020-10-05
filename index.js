const { render } = require('ejs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sqlite = require('sqlite')

const dbConnection = sqlite.open('database.sqlite', { Promise })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const db = await dbConnection
    const categoriesDb = await db.all('select * from categories;')
    const vacancies = await db.all('select * from vacancies;')
    const categories = categoriesDb.map(cat => {
        return {
            ...cat,
            vacancies: vacancies.filter(vacancy => vacancy.category === cat.id)
        }
    })

    res.render('home', {
        categories
    })
})

app.get('/vaga/:id', async (req, res) => {
    const db = await dbConnection
    const vacancy = await db.get('select * from vacancies where id = ' + req.params.id)
    
    res.render('vaga', {
        vacancy
    })
})

app.get('/admin', (req, res) => {
    res.render('admin/home')
})

app.get('/admin/vagas', async (req, res) => {
    const db = await dbConnection
    const vacancies = await db.all('select * from vacancies;')
    res.render('admin/vagas', { vacancies })
})

app.get('/admin/vagas/delete/:id', async (req, res) => {
    const db = await dbConnection
    await db.run('delete from vacancies where id = ' + req.params.id)

    res.redirect('/admin/vagas')
})

app.get('/admin/vagas/nova', async (req, res) => {
    res.render('admin/nova-vaga')
})

app.post('/admin/vagas/nova', async (req, res) => {
    res.send(req.body)
})

const init = async () => {
    const db = await dbConnection
    await db.run('create table if not exists categories(id INTEGER PRIMARY KEY, category TEXT)')
    await db.run('create table if not exists vacancies(id INTEGER PRIMARY KEY, category INTEGER, title TEXT, description TEXT)')
    // const category = 'Marketing team'
    // await db.run(`insert into categories(category) values('${category}')`)
    // const vacancy = 'Social Media (San Francisco)'
    // const description = 'Vaga para social media que fez o fullstack lab'
    // await db.run(`insert into vacancies(category, title, description) values(2, '${vacancy}', '${description}')`)
}
init()

app.listen(3000, err => {
    if(err) {
        console.log('Não foi possivel iniciar o servidor do Jobify.')
    } else {
        console.log('Servidor do Jobify rodando...')
    }
})
