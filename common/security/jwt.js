var jwt = require('jsonwebtoken');
const SendResponse = require('../errors/response')

class JwtModule {


    generateToken(data){
        return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '365d' })
    }

    authenticationToken(req , res , next) {
        try {
            const authHeader = req.headers['x-access-token']
            const token = authHeader
            const response = SendResponse(401 , false , "Token not Found" , null)
            if(token == null || undefined) return res.status(response.status).send(response)
    
            jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (error , user)=>{
                const response = SendResponse(401 , false , "Invaild Token" , null)
                if(error) return res.status(response.status).send(response)
                next()
            })

        } catch (error) {
            const response = SendResponse(400 , false , "Server Error In Token Module" , null)
            res.status(response.status).send(response)
        }

    }

    decryptToken(req , res , next){
        const authHeader = req.headers['x-access-token']
        const token = authHeader
        const newData =  jwt.decode(token, process.env.ACCESS_TOKEN_SECRET , "HS256")
        req['Decrypt'] = newData
        next()
    }

}

module.exports = new JwtModule