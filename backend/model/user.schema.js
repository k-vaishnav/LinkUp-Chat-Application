import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username must not exceed 20 characters"],
  },
  emailId: { type: String, unique: true ,
     required: [true, 'Email is required'],
     match:[/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  password: {
        type: String,
        // validate: {
        //     validator: function(value) {
        //         return /^(?=.*[!@#$%&*])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
        //     },
        //     message: "Password should be between 8-12 characters and contain at least one special character."
        // }
         required: [true, "Password is required"]
    },
});

export const User = mongoose.model("User", userSchema);
