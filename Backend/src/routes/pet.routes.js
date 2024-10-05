import {Router} from 'express'
import {state, feed, sleep, heal, revive} from '../controllers/pet.controller.js'
import {authRequire} from '../middlewares/jwt.js'
//import {validatorSchema} from '../middlewares/validator.js'
//import {registerSchema,loginSchema} from '../schemas/auth.schema.js'

const router =  Router()

router.get('/state', authRequire, state)

router.get('/feed', authRequire, feed)

router.get('/sleep', authRequire, sleep)

router.get('/heal', authRequire, heal)

router.get('/revive', authRequire, revive)

export default router