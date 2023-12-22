import 'dotenv/config'
import express from 'express'
import route from './src/routes/route.js'

const app = express()

// app.use(
//     cors{{
//         origin: process.env.CLIENT_URL
//     }}
// )

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', route)

app.listen(process.env.HOST_PORT, () => {
    console.log(`sistema iniciado com sucesso na porta: ${process.env.HOST_PORT}`)
})