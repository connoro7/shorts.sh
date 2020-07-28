const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const yup = require('yup')
const monk = require('monk')
const { nanoid } = require('nanoid')

require('dotenv').config()

const db = monk(process.env.MONGODB_URI)
const urls = db.get('urls')
urls.createIndex({ slug: 1 }, { unique: true })

const app = express()

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))

app.get('/url/:id', (req, res) => {
  //todo: get a short url by id
})

app.get('/:id', async (req, res) => {
  /// Destructure request parameters to ID and Slug object
  const { id: slug } = req.params
  ///
  try {
    /// Waits for db.get('urls').findOne({slug}) to be returned from DB, returns boolean
    const url = await urls.findOne({ slug })
    /// If url === true,
    if (url) {
      res.redirect(url.url)
    }

    res.redirect(`/?error=${slug}-not-found`)
    /// If no link in DB, catch error and redirect to 404 query
  } catch (error) {
    res.redirect(`/?error=Link-not-found`)
  }
})

/// Yup schema for converting to correct output format
const schema = yup.object().shape({
  slug: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  url: yup.string().trim().url().required(),
})

app.post('/url', async (req, res, next) => {
  let { slug, url } = req.body
  try {
    /// Wait for yup.object().shape({}).validate({}) to return
    await schema.validate({
      slug,
      url,
    })
    /// If slug does not exist, assign slug a random UUID
    if (!slug) {
      slug = nanoid(5)
    }
    /// Manually check if a slug is in use
    else {
      const existing = await urls.findOne({ slug })
      if (existing) {
        throw new Error('Slug in use')
      }
    }
    /// Convert slug to lowercase so that we don't have to deal with case sensitivity :)
    slug = slug.toLowerCase()
    /// Creates object with base URL and slug
    const newUrl = {
      url,
      slug,
    }
    /// Returns output as JSON
    const created = await urls.insert(newUrl)
    res.json(created)
    /// Error catching
  } catch (error) {
    next(error)
  }
})

/// Error handling
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status)
  } else {
    res.status(500)
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
