import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import participantesRouter from './routes/participantes'
import partidosRouter from './routes/partidos'
import loginRouter from './routes/login'
import prediccionesRouter from './routes/predicciones'
import paisesRouter from './routes/paises'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = Number(process.env.PORT) || 8080

app.get('/', (req, res) => {
  res.send('Backend funcionando')
})

// Rutas de participantes
app.use('/api/participantes', participantesRouter)

//Ruta de partidos
app.use('/api/partidos', partidosRouter)

//Ruta de login
app.use('/api/login', loginRouter)

//Ruta de predicciones
app.use('/api/predicciones', prediccionesRouter)

//Ruta de paises
app.use('/api/paises', paisesRouter)

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})