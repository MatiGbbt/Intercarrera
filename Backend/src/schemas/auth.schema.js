import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: "Username es obligatorio"
    }),
    email: z.string({
        required_error: "Email es obligatorio"
    })
    .email({
        message: "El email ingresado es invalido"
    }),  
    password: z.string({
        required_error: "Password es obligatorio"
    })
    .min(6,{
        message: "Password tiene que tener minimo 6 digitos"
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email es obligatorio"
    })
    .email({
        message: "El email ingresado es invalido"
    }),  
    password: z.string({
        required_error: "Password es obligatorio"
    })
    .min(6,{
         message: "Password tiene que tener minimo 6 digitos"
    })
})