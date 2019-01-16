const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const firebase = require('firebase')
const serviceAccount = require('./credentials.json')
const { getDocumentById } = require('./mixins')

firebase.initializeApp(serviceAccount)

const app = express()
const auth = firebase.auth()
const firestore = firebase.firestore()

firestore.settings({ timestampsInSnapshots: true })

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user/auth/', async (req, res) => {
  console.info('Try login')
  try {
    const signIn = await auth.signInWithEmailAndPassword(req.body.email, req.body.password)
    if (signIn) {
      const user = await getDocumentById(firestore.collection('users'), signIn.user.uid)
      res.send(user)
    }
  } catch(e) {
    res.send(e.code)
  }
})

app.post('/user/exit', async (req, res) => {
  const result = await auth.signOut()
  res.send(result)
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})