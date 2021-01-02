const {User} = require('../models')
const {verification} = require('../helper/token')

const authentication = async (req,res,next) =>{
    const {access_token} = req.headers
    try {
        const user = await verification(access_token)
        const userData = await User.findOne({where:{email:user.email}})
        if (userData){
            req.user = user
            next()
        }else{
         return res.send(400).json({message:`doenst recognise user`})
        }
    } catch (error) {
        next(error)
    }
}

const authorization = async (req,res,next) =>{
    const userData = await User.findByPk(req.user.id)
    if (userData.role === 'admin'){
        next()
    }else{
        return res.status(400).json({message:`you're not an admin`})
    }
}

module.exports = { authentication , authorization}