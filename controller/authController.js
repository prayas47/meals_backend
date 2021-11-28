let validation = require('../common/validation/validation')
let JWT        = require('jsonwebtoken')
let moment     = require('moment')
let Crypt      = require('../common/helper/crypt').crypt
let JWTHandler = require('../common/security/jwt')
let valid      = new validation.validation();
let crypt      = new Crypt()
require('dotenv').config()
const SendResponse = require('../common/errors/response')

let authModel      = require('../models/authModel')


class Auth {
    signUp = async(req , res) => {
        try{
            let json = req.body
            let obj = {}
                obj.email    = json.email
                obj.password = json.password
                await valid.signUpValidation(obj).then(async(validSignUp) => {
                    if(validSignUp == true){
                        await authModel.findOne({email : obj.email} , {email : 1}).then(async(userData) => {
                            if(!userData){
                                await authModel.create(obj).then(async(data) => {
                                    const response = SendResponse(200 , false , "Account is sucessfully created", null)
                                    return res.status(response.status).send(response)
                                }).catch(async(err) => {
                                    const response = SendResponse(400 , true , "Spmething Went Wrong", null)
                                    return res.status(response.status).send(response)
                                })
                            }else{
                                const response = SendResponse(400 , true , "Email Already Exist", null)
                                return res.status(response.status).send(response)
                            }

                        }).catch((err) => {
                            const response = SendResponse(400 , true , "Error In Email Check", null)
                            return res.status(response.status).send(response)
                        })
                    }else{
                        const response = SendResponse(400 , true , "Validation Error", validSignUp)
                        return res.status(response.status).send(response)
                    }

                }).catch((err) => {
                    const response = SendResponse(400 , true , "Spmething Went Wrong", null)
                    return res.status(response.status).send(response)
                })

        }catch(e){
            const response = SendResponse(500 , true , "Internal Server Error", null)
            return res.status(response.status).send(response)
        }
    }

    login = async(req , res) => {
        try{
            let json = req.body
            let obj = {}
                obj.email = json.email
                obj.password = json.password
            await valid.signUpValidation(obj).then(async(checkData) => {
                if(checkData == true){
                    await authModel.findOne({email : obj.email} , {email : 1, password : 1,isActive : 1 }).then(async(userD) => {
                        if(userD){
                            if(userD.isActive == true){
                                let isValid = crypt.compareHash(obj.password, userD ? userD.password : '');
                                if(isValid){
                                    const _token = JWTHandler.generateToken({
                                        _id         : userD._id,
                                        email       : userD.email,
                                    })
                                    const response = SendResponse(200 , false , "Logged In Successfully", { _token: crypt.dataEncrypt(_token) , email : userD.email })
                                    return res.status(response.status).send(response)

                                }else{
                                    const response = SendResponse(400 , true , "Invalid Credentials", null)
                                    return res.status(response.status).send(response)
                                }
                                   
                            }else{
                                const response = SendResponse(400 , true , "Account is locked , please contact Administrator", null)
                                return res.status(response.status).send(response)
                            }

                        }else{
                            const response = SendResponse(404 , true , "User Not Found", null)
                            return res.status(response.status).send(response)
                        }

                    }).catch((err) => {
                        const response = SendResponse(400 , true , "Error In User Fetch", null)
                        return res.status(response.status).send(response)
                    })

                }else{
                    const response = SendResponse(400 , true , "Validation Error", checkData)
                    return res.status(response.status).send(response)
                }

            }).catch((err) => {
                const response = SendResponse(400 , true , "Something Went Wrong", null)
                return res.status(response.status).send(response)
            })

        }catch(e){
            const response = SendResponse(500 , true , "Internal Server Error", null)
            return res.status(response.status).send(response)
        }
    }

}

module.exports = Auth
