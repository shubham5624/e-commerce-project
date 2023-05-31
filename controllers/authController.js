export const registerController = async(req,res) => {
    try {
        const {name,email,password,phone,address} = req.body

        // vlidations
        if(name){
            return res.send({error:'name is requred'})
        }
        if(email){
            return res.send({error:'email is requred'})
        }
        if(password){
            return res.send({error:'password is requred'})
        }
        if(phone){
            return res.send({error:'phone is requred'})
        }
        if(address){
            return res.send({error:'address is requred'})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in Registration',error
        })
    }
}



