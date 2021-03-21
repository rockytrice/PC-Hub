
const User = require('../models/user')

exports.createUpdateUser = async (req, res) => {
    const {name,picture, email} = req.user
    const user = await User.findOneAndUpdate({email}, {name,picture}, {new:true})

    if(user){
        console.log('User updated',user)
        res.json(user)
    }else {
        const newUser = await new User({
            email,
            name,
            picture,
        }).save();
        console.log('User created',newUser)
        res.json(newUser);
    }
};