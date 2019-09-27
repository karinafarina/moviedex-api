require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const MOVIEDATA = require('./movieData.json')

const app = express()

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan('morganSetting'))
app.use(helmet())
app.use(cors())

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
    response = response.filter(oneMovie => 
      oneMovie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }
  if(req.query.country) {
    response = response.filter(oneMovie => 
      oneMovie.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
  }
  if(req.query.avg_vote) {
    response = response.filter(oneMovie => 
      Number(oneMovie.avg_vote) >= Number(req.query.avg_vote)
    )
  }
  res.json(response)
})

app.use((error, req, res, next) => {
  let response
  if(process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {

})
