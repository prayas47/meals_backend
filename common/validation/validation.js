const { Validator } = require('node-input-validator')

class validation {

    signUpValidation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                email : 'required',
                password : 'required',
            })    

            validate.check().then((matched) => {
                if (!matched) {
                    resolve(validate.errors)
                } else {
                    resolve(matched) 
                }
            })
        })
    }

    mealsValidation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                mealName : 'required',
                calories : 'required',
            })    

            validate.check().then((matched) => {
                if (!matched) {
                    resolve(validate.errors)
                } else {
                    resolve(matched) 
                }
            })
        })
    }
}


// all end


module.exports = {
    validation : validation
}
