const register = async(req, res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }
    // check if user already exists
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({
            message: "User already exists"
        })
    }
    // create user
    const user = await User.create({
        name,
        email,
        password
    });
    if(user){
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        return res.status(400).json({
            message: "Invalid user data"
        })
    }
}

export {register}