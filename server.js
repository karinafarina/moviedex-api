const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.use((requ, res) => {
  res.send('Hello, freedie')
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})
