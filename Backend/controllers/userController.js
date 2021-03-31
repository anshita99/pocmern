const User=require('../models/user');
const Category=require('../models/category');
const jwt=require('jsonwebtoken')
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '' }


    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered'
    }
    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect'
    }

    if (err.code === 11000) {
        errors.email = 'that email is already registered'
        return errors;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}
const maxAge=3*24*60*60;
const createToken=(id)=>{
    return jwt.sign({id}, 'priyesh pandey auth',{
        expiresIn: maxAge
    });
}

module.exports.get_dropdown=async (req,res)=>{
    try{
        const drop=await Category.find();
        console.log("consol",drop)
        res.status(200).json(drop)
    }catch(err)
    {
        res.status(400).json(err)
    }
}



module.exports.admin_check=async(req,res)=>{
    const email=req.params.email;
    console.log("Email",email)
    const user=await User.find({email});
    const tokenvalue = createToken(user._id);
        const token=jwt.sign(tokenvalue,'Hello world');
        console.log('Token value',token)
        res.header('auth-token',token)
    res.status(200).json(user)
    
   
}
module.exports.get_all_details=async (req,res)=>{
    
    try{
        const user=await User.find();
        console.log(user)
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err)
    }

}





module.exports.signup_post = async (req, res) => {
   
    const { fullname,email, password, role, category} = req.body;
    console.log('Signup body',req.body)
    try {
        const user = await User.create({ fullname,email, password, role, category });
        const drop=await Category.find();
        console.log("The value of uer",drop)
       
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err)
        console.log(err);
        res.status(400).json({ errors })
        
    }
}
module.exports.delete_item=async (req,res)=>{
    const id=req.params.id;
    console.log("id",id)
    try{
    const user=await User.deleteOne({_id:id});
    console.log(user)
    res.status(200).json(user);
    }catch(err){
        res.status(400).json(err)
    }
}
module.exports.login_post = async (req, res) => {
    const { email, password ,role,active} = req.body;
    try {
        const user = await User.login(email, password,role,active);

        const tokenvalue = createToken(user._id);
        const token=jwt.sign(tokenvalue,'Hello world');
        console.log('Token value',token)
        res.header('auth-token',token)
        res.status(200).json({ role: user.role ,user:user._id,active:user.active})
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
   
}
module.exports.user_item=async (req,res)=>{
    const id=req.params.id;
    console.log("it is id",id)
    try{
        const user=await User.findById(id);
        console.log(user)
        res.json(user)
    }catch(err){
        console.log(err)
    }
}

module.exports.update_item=async (req,res)=>{
    
    try {
        const upateUser = await User.updateOne({ _id: req.params.id }, { $set: { email: req.body.email, password: req.body.password } })
        .then(result=>{
            console.log("update",result)
        })
    } catch (err) {
        res.status(400)
        console.log(err)
    }
}
module.exports.userupdate_item = async (req, res) => {
    try {
        const upateUser = await User.updateOne({ _id: req.params.id }, { $set: { email: req.body.email,fullname:req.body.fullname } })
        .then(result=>{
            console.log("update",result)
            res.status(200)
        })
        res.status(200).send("Done")
    } catch (err) {
        res.status(400)
        console.log(err)
    }
}
module.exports.filter_data=async (req,res)=>{
    console.log(req.params.category)
    try{
        const user = await User.find({ category: req.params.category})
    res.status(200).json(user)
    console.log(user)   
    }catch(err){
        console.log(err)
    }

}
module.exports.active=async (req,res)=>{
    try{
        const updateUser=await User.updateOne({_id:req.params.id},{$set:{active:true}})
        res.status(200).json(updateUser)
    }catch(err){
        res.send(err)
    }
   
}
module.exports.deactive = async (req, res) => {
    try {
        const updateUser = await User.updateOne({ _id: req.params.id }, { $set: { active:false} })
        res.status(200).json(updateUser)
    } catch (err) {
        res.send(err)
    }
    
}
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
