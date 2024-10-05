import config from '../config.js'
import JWT from 'jsonwebtoken'

export function CreateAccessToken(payload){

    return new Promise((resolve, reject) => { //objeto promesa para poder usarlo de forma asincrona
        JWT.sign(
        payload, //payload
        config.token_key, //key
        {expiresIn: '1d'}, //time
        (err, token) => {if (err) reject(err); resolve(token)} //res 
    ) 
    })   
}

export const authRequire = (req, res, next) => {

    const {token} = req.cookies //obtengo el token de la cookie creada al loguearse

    if(!token)
    return res.status(401).json({message: "No token, Autorización denegada"});
    JWT.verify(token,config.token_key, (err, user) => {
        if (err) return res.status(403).json({message: 'Token Invalido'});
        req.user = user
        next()
    })

}
 