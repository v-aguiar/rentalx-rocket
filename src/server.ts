import express from 'express'
import { categoriesRoutes } from './routes/categories.routes'

const app = express()

app.use(express.json())

app.use('/categories', categoriesRoutes)

app.listen(4000, () => console.log('🚀 Server is running on port 4000', 'http://localhost:4000'))