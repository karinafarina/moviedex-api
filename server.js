require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const MOVIEDATA = require('./movieData.json')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

console.log(process.env.API_TOKEN)

app.use(function validateBeareerToken(req, res, next) {
  const authToken = req.get('Authorization')
  const apiToken = process.env.API_TOKEN
  if(!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorize request' })
  }
  next()
})

app.get('/movie', function handleGetMoves(req, res) {
  let response = MOVIEDATA;

  if(req.query.genre) {
    response = response.filter(oneMovie => {
      oneMovie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    })
  }
  if(req.query.country) {
    response = response.filter(oneMovie => {
      oneMovie.country.toLowerCase().includes(req.query.country.toLowerCase())
    })
  }
  if(req.query.avg_vote) {
    response = response.filter(oneMovie => {
      Number(oneMovie.avg_vote) >= Numver(req.query.avg_vote)
    })
  }
  res.json(response)
})
const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})
