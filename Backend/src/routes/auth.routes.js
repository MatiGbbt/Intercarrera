import {Router} from 'express'
import {register, login, logout, profile} from '../controllers/auth.controller.js'
import {authRequire} from '../middlewares/jwt.js'
import {validatorSchema} from '../middlewares/validator.js'
import {registerSchema,loginSchema} from '../schemas/auth.schema.js'


const router =  Router()

router.post('/register', validatorSchema(registerSchema), register)

router.post('/login', validatorSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/profile', authRequire, profile)

export default router