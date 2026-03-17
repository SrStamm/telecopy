// Servidor HTTP
import express from 'express'
const app = express()

// Usar variáveis de ambiente - contêm configurações e/ou passwords
import { configDotenv } from 'dotenv'
configDotenv()
const PORT = process.env.PORT || 3000

// Utilização do Helmet para algumas medidas de segurança
import helmet from "helmet";
app.use(helmet());

// Aceitar texto para a rota /copy
app.use(express.text());

let content = {
    "a3175b39145aabc": {
        createdAt: new Date("2026-03-17 21:14"),
        value: "Este é o valor do diogo"
    }
}

app.get('/', (req, res) => {
    res.send('Página Home.')
})


app.get('/get-all-contents', (req, res) => {
    res.json(content)
})

app.post('/copy', (req, res) => {
    // Se o jwt existir e houver body, substituir o content
    if (!req.body) {
        res.status(400).send("No content in body.")
    }
    else {
        const newId = crypto.randomUUID()
        content[newId] = {
            createdAt: new Date(),
            value: req.body
        }
        res.send(`/${newId}`)
    }
})

app.get('/:id', (req, res) => {
    const id = req.params.id
    // Se o jwt existir, enviar o content
    res.send(JSON.stringify(content[id].value))
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
