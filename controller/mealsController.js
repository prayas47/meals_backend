let validation = require('../common/validation/validation')
let valid = new validation.validation();

const SendResponse  = require('../common/errors/response')

const mealsModel = require('../models/mealsModel')

require('dotenv').config()


class Main {
    addMeals = async (req , res) => {
        try{
            let json = req.body
            let obj = {
                mealName : json.mealName,
                calories : json.calories,
            }

            await valid.mealsValidation(obj).then(async(checkmeals) => {
                if(checkmeals == true){
                    await mealsModel.findOne({mealName : obj.mealName} , {mealName : 1}).then(async(cateData) => {
                        if(cateData){
                            const response = SendResponse(400 , true , "Meal Already Exist", null)
                            return res.status(response.status).send(response)
                        }
                        await mealsModel.create(obj).then((data) => {
                            const response = SendResponse(200 , false , "Meal Created Successfully", data)
                            return res.status(response.status).send(response)
                        }).catch((err) => {
                            const response = SendResponse(400 , true , "Error In Meal Creation", null)
                            return res.status(response.status).send(response)
                        })

                    }).catch((err) => {
                        const response = SendResponse(400 , true , "Error In Meal Check", null)
                        return res.status(response.status).send(response)
                    })
                    
                }else{
                    const response = SendResponse(400 , true , "Validation Error", checkmeals)
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

    fetchMealsList = (req , res) => {
        try{
            let start = new Date();
            start.setHours(0,0,0,0);

            let end = new Date();
            end.setHours(23,59,59,999);
                
            mealsModel.aggregate([
                {
                    $match:  {
                        $and:[{
                            createdAt: {
                                $gte: start, $lt: end
                            }
                        },{
                                isActive:true
                            }
                        ]
                    }
                },
            ])
            .then((cateData) => {
                const response = SendResponse(200 , false , "meals List Successfully Fetched", cateData)
                return res.status(response.status).send(response)
            }).catch((err) => {
                const response = SendResponse(400 , true , "Error meals List Fetch", null)
                return res.status(response.status).send(response)
            })
        }catch(e){
            const response = SendResponse(500 , true , "Internal Server Error", null)
            return res.status(response.status).send(response)
        }
    }

    updateMeals = (req , res) => {
        try{
            let id = req.params.id
            let json = req.body
            let obj = {
                mealName : json.mealName,
                calories : json.calories
            }

            if(!id){
                const response = SendResponse(400 , true , "Not A Valid Id", null)
                return res.status(response.status).send(response)
            }

            valid.mealsValidation(obj).then(async(checkmeals) => {
                if(checkmeals == true){
                    mealsModel.findOne({mealName : obj.mealName} , {mealName : 1}).then((cateD) => {
                        if(cateD){
                            if(cateD._id != id){
                                const response = SendResponse(400 , true , "Meal Already Exist", null)
                                return res.status(response.status).send(response)
                            }
                        }
        
                        mealsModel.updateOne({_id : id} , {$set : obj}).then((data) => {
                            const response = SendResponse(200 , false , "Meal Updation Sucessfull", null)
                            return res.status(response.status).send(response)
        
                        }).catch((err) => {
                            const response = SendResponse(400 , true , "Meal Updation Error", null)
                            return res.status(response.status).send(response)
                        })
        
        
                    }).catch((err) => {
                        const response = SendResponse(400 , true , "meals Fetch Error", null)
                        return res.status(response.status).send(response)
                    })

                }else{
                    const response = SendResponse(400 , true , "Validation Error", checkmeals)
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

    deleteMeals = async (req , res) => {
        try{
            let id = req.params.id
            if(!id){
                const response = SendResponse(400 , true , "Not A Valid Id", null)
                return res.status(response.status).send(response)
            }
            mealsModel.deleteOne({_id : id}).then(()=>{
                const response = SendResponse(200 , false , "Meal Deleted Successfully", null)
                return res.status(response.status).send(response)
            }).catch((err) => {
                const response = SendResponse(400 , true , "Unable to delete", null)
                return res.status(response.status).send(response)
            })
        }catch(e){
            const response = SendResponse(500 , true , "Internal Server Error", null)
            return res.status(response.status).send(response)
        }
    }
}
module.exports = Main