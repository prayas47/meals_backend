/* eslint-disable indent,no-mixed-spaces-and-tabs,no-unused-vars */
const
    crypto      = require('crypto'),
    path        = require('path'),
    jwtToken    = require('jsonwebtoken'),
    _           = require('underscore'),
    CryptoJs    = require('crypto-js')

class Crypt {
    constructor() {
        this.key = process.env.ENCRYPTION_KEY;
        this.algo = process.env.ENCRYPTION_ALGO;
    }

    verify(token) {
        try {
            let decoded = jwtToken.decode(token, {complete: true});
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@22" , decoded)
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
    

    encrypt = (data) => {
        let iv          = crypto.randomBytes(16),
            cipher      = crypto.createCipheriv(this.algo, Buffer.from(this.key), iv),
            encrypted   = cipher.update(data);
            encrypted   = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    decrypt = (data) => {

        let textParts = data.split(':')
        let iv = Buffer.from(textParts.shift(), 'hex')
        let encryptedText = Buffer.from(textParts.join(':'), 'hex')
        let decipher = crypto.createDecipheriv(process.env.ENCRYPTION_ALGO, Buffer.from(process.env.ENCRYPTION_KEY), iv)
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    hash = (data) => {
        data = crypto.createHash('md5').update(data).digest('hex');
        return data;

    }

    compareHash = (data, password) => {
        let hash = this.hash(data),
            isEqual = hash == password;
        return isEqual;

    }

    dataEncrypt = (_data) => {
        const _buffer = Buffer.from(JSON.stringify(_data))
        const _encrypt = this.encrypt(_buffer);
        /*_decrypt = this.decrypt(_encrypt),
        _decode = JSON.parse(_decrypt);*/
        return _encrypt;
    }

    dataDecrypt = (_data) => {
        const _decrypt = this.decrypt(_data)
        const  _decode = JSON.parse(_decrypt);

        return _decode;
    }

    //The get method is use for decrypt the value.
    get_decrypt = (value) => {
        var key = CryptoJs.enc.Utf8.parse(process.env.ENCRYPTION_KEY);
        var iv = CryptoJs.enc.Utf8.parse(key);
        var decrypted = CryptoJs.AES.decrypt(value, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJs.mode.CBC,
            padding: CryptoJs.pad.Pkcs7
        });
        return decrypted.toString(CryptoJs.enc.Utf8);
    }

}


module.exports = {
    crypt: Crypt
}
