import bcrypt from 'bcrypt'
import { User } from '../model/user.schema.js';
import jwt from 'jsonwebtoken'

export const register = async (req,res)=>{
    const {username,email,password } =req.body;
    const pwd = /^(?=.*[!@#$%&*])[A-Za-z\d@$!%*?&]{8,12}$/ // to validate password
    if(!pwd.test(password)) {
        return res.status(400).json({msg:"Password should be between 8-12 characters and contain at least one special character."})
    }
    try {
        const hashedPwd = await bcrypt.hash(password,12);
        const user = await User.create({userName:username,emailId:email,password:hashedPwd})
        console.log(user)
        res.status(201).json({ msg: "Registered", user });
    }catch(err) {
        console.log(err.message,err.name)
         if (err.name === "ValidationError"  ) {
        // Extract all error messages from the Mongoose validation error
        const messages = Object.values(err.errors).map((e) => e.message);
        // You can send one or all messages; here we send the first one
        return res.status(400).json({ msg: messages[0] });
    }
    // else if(err.name === "MongoServerError") {
    //     return res.status(400).json({ msg: "Re-enter the unique credentials" });
    // }
    else {
         // Fallback for other kinds of errors
        return  res.status(400).json({ msg: "Registration failed" });
    }
   
   
    }
}


export const login = async (req,res) =>{
    const  {username,password} = req.body;
    try{
        const user = await User.findOne({userName:username});
        if(!(user) || !(await bcrypt.compare(password,user.password))) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }

        const token = jwt.sign({id:user._id,name:user.userName,email:user.emailId},'dmK4kFuLVVxgMuX6S0NZCAtLd05U0D4M');
        res.status(200).json({token,username:user.userName});
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({msg:"Error logging in"})
    }
}
