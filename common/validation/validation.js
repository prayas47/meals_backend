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

    categoryValidation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                categoryName : 'required',
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

    productValidation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                categoryId  : 'required',
                productName : 'required',
                qualityType : 'required'
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

    contactUsValidation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                name  : 'required',
                email : 'required',
                body  : 'required'
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

    moduleValidation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                moduleName  : 'required'
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

    superAdminApprovalValidation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                roleId                  : 'required',
                userId                  : 'required',
                isApprovedBySuperAdmin  : 'required'
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

    blockUnBlockValidation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                isBlocked  : 'required'
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

    sellerProfileValidation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                email          : 'required',
                firstName      : 'required',
                lastName       : 'required',
                mobile         : 'required',
                email          : 'required',
                shopName       : 'required',
                addressLineOne : 'required',
                pinCode        : 'required',
                city           : 'required',
                state          : 'required',
                openTime       : 'required',
                closeTime      : 'required',
                description    : 'required',
                homeDelevery   : 'required',
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


    approvalProductvalidation = (obj) => {
        return new Promise((resolve, reject) => {
            const validate = new Validator(obj, {
                categoryId      : 'required',
                productName     : 'required',
                qualityType     : 'required',
                approvalStatus  : 'required',
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
