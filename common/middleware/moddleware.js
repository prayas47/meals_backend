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
                return payload;
            }
        } catch (e) {
            (e);
        }
        return payload;
    }

    checkAuthorization(req, res, next) {
        const endTime = moment().unix()

        if (!req.headers['x-access-token']) {
            return res.status(401).send({error: 'Missing x-access-token Header'})
        } else {
            const _headers  = crypt.dataDecrypt(req.headers['x-access-token'])
            let decodeToken = crypt.verify(_headers)

            if (decodeToken === false) {
                return res.status(401).send({error: 'Token Is Not Valid'})
            } else {
                if (decodeToken.exp > endTime) {
                    return userModel.findOne({
                        _id     : decodeToken._id,
                        email   : decodeToken.email
                    }) 
                    .then((data) => {
                        if(data != null) {
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

    _decode(token) {
        let decodeToken = this.verify(token);
        return decodeToken;
    }
}


module.exports = Middleware;
