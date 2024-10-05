import User from '../models/user.model.js'
import Bcrypt from 'bcryptjs'
import {CreateAccessToken} from '../middlewares/jwt.js'

export const register = async (req, res) => {
    
    const {username, password, email} = req.body

    try {

        //crea un hash con el password
        const passwordHash = await Bcrypt.hash(password, 10)

        //crea una instancia del modelo "User"
        const newUser = new User({
            username,
            password: passwordHash,
            email
        })
        
        //guarda la instancia de "User" en la db
        const savedUser = await newUser.save()             

        //genero el token con el payload "_id"
        const token = await CreateAccessToken({id: savedUser._id})

        //res
        res.cookie('token', token)//token por cookie
        res.json({ //datos especificos que retonar el json
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        })
        //

    } catch (error) {

        res.status(500).json({message: error.message})

    }
}

export const login = async (req, res) => {

    const {password, email} = req.body

    try {
        
        //busca el usuario en la DB por el maild
        const userFound = await User.findOne({email})

        if (!userFound) return res.status(400).json({message: "Usuario No Encontrado."}); //si no lo encuentra retorna un 400 + msg
        const isMatch = await Bcrypt.compare(password, userFound.password) //si lo encuentra verifica si coincide la contraseña de la DB con la ingresada por el usuario

        if (!isMatch) return res.status(400).json({message: "Constraseña Invalida."}) //si no coinciden las contraseña significa que es invalida

        //genero el token con el payload "_id"
        const token = await CreateAccessToken({id: userFound._id})

        //res
        res.cookie('token', token)//token por cookie
        res.json({ //datos especificos que retonar el json
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
        //

    } catch (error) {

        res.status(500).json({message: error.message})

    }
}

export const logout = async (req, res) => {
    res.cookie('token', "",{expires: new Date(0)})
    return res.sendStatus(200)    
}

export const profile = async (req, res) => {

    const userFound = await User.findById(req.user.id)
    
    if(!userFound)
    return res.status(400).json({message: "Usuario no Encontrado."});
    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })   
}