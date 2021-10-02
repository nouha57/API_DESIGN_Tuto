import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { signup, signin, protect } from './utils/auth'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'

export const app = express()

// define a router then mount it to app 
const router = express.Router() //router can do the exact same thing as app, only he can not listen on a port 

router.get('/me', (req, res) => {
  res.send({me: 'Hello'})
})
app.use('/api', router)


// define routes 
const routes = ['get/cat', 'get/cat/:id', 'post/cat', 'put/cat/:id', 'delete/cat/:id']
router.route('/cat')
  .get()
  .post()

router.route('/cat/:id')
  .get()
  .put()
  .delete()



app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/list', listRouter)

//--------------------------------------------------

const log = (req, res, next) => {
  console.log('logging')
  next() //if there's an error, next chetaadik lil function l tji baad 
}
app.use(log)

app.put('/data', (req,res)=> {
  // update data here 
})


//-----------------------------------------------

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}

// in server.js, specify imports and import the routes you'll be using 
// also, set app to express and then don't forget to use : cors, json ..
// then, set up ' app.use ' and ' app.post ' ( define the rest APIs ) 
// app.listen on what port ?  

// what is middlewares ?? 
   // they come between req and response ( some stuff we do to the incoming request before sending them to destination)

// Difference between middlewares and controllers ?? 
    

//REST routes with Express 
  // route matching system : exact , regex : app.get('^(me)', (req,res)) , parameter match (:id) ..
  //by tradition we do : route = exact_match/parameter_match 
  // REST API : app.get ( '/route' ,(res, res) ))

//route order matters 

//app is always the root router 
// sub-routers 
  // i need to mount the router to app : app.use('/api', router)
//why use router ? so we don't have to do everything in the same page 

// router verb methods 
