/* eslint-disable indent,semi,quotes,no-unused-vars */
const path      = require('path'),
    moment      = require('moment'),
    jwtToken    = require('jsonwebtoken'),
    Crypt       = require('../../common/helper/crypt').crypt,
    mongoose    = require('mongoose'),
    userModel   = require('../../models/authModel');

let crypt   = new Crypt()

class Middleware {
    verify(token) {

        
        try {
            let decoded = jwtToken.decode(token, {complete: true});
            if (decoded === null) {
                return false;
            } else {
                let payload = decoded.payload;
                //let decrypt = crypt.decrypt(payload);
                //let _final = JSON.parse(decrypt);
                //payload = jwtToken.decode(_final);
                return payload;
            }
        } catch (e) {
            (e);
        }
        return payload;
    }

    //@ fetch jwt token from headers
    //@ decode jwt
    //@ insert jwt object into request
    checkAuthorization(req, res, next) {
        const endTime = moment().unix()

        if (!req.headers.authorization) {
            return res.status(401).send({error: 'Missing Authorization Header'})
        } else {
            const _headers  = crypt.dataDecrypt(req.headers.authorization)
            let decodeToken = crypt.verify(_headers)

            if (decodeToken === false) {
                return res.status(401).send({error: 'Token Is Not Valid'})
            } else {
                if (decodeToken.exp > endTime) {
                    return userModel.findOne({
                        // _id     : decodeToken.id,
                        email   : decodeToken.email
                    }) 
                    .then((company) => {
                        if(company != null) {
                            req.tokenInfo = decodeToken
                            next()
                        } else {
                            return res.status(401).send({error: 'Unauthorized User'});
                        }        
                    })
                    .catch((err) => {
                        next(err);
                    });
                } else {
                    return res.status(401).send({error: 'Token Expired'})
                }
            }
        }
    }


    // decode token
    _decode(token) {
        let decodeToken = this.verify(token);
        return decodeToken;
    }



    checkGetMethod(req, res, next) {
        if(req.method === 'GET'){
            next ()
        } else {
            return res.status(400).json({"Message": "Your request method is not acceptable .."})
        }
    }
    checkPostMethod(req, res, next) {
        if(req.method === 'POST'){
            next()
        } else {
            return res.status(400).json({"Message": "Your request method is not acceptable .."})
        }
    }
    checkPutMethod(req, res, next) {
        if(req.method === 'PUT'){
            next()
        } else {
            return res.status(400).json({"Message": "Your request method is not acceptable .."})
        }
    }

    
// all end    
}


module.exports = Middleware;
