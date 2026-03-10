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

// Valor guardado em memória
let content = ""

app.get('/', (req, res) => {
    res.send('Página em React.')
})

// Enviar dados de registo
app.post('/register', (req, res) => {
    res.send('Registar.')
})

// Enviar dados de login
app.post('/login', (req, res) => {
    // Se o login estiver correto, enviar um jwt
    res.send('Fazer login.')
})

app.post('/copy', (req, res) => {
    // Se o jwt existir e houver body, substituir o content
    if (!req.body){
        res.status(400).send("No content in body.")
    }
    else {
        content = req.body
        res.send('OK')
    }
})

app.get('/paste', (req, res) => {
    // Se o jwt existir, enviar o content
    res.send(content)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
