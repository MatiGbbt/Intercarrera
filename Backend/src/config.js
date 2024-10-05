import { config } from 'dotenv'
config()

export default{
    port: process.env.PORT || 6500,

    token_key: process.env.TOKEN_KEY,

    mongodb_uri: process.env.MONGODB_URI,
}