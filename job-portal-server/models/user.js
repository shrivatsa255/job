// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const Joi = require('joi');
// const passwordComplexity = require('joi-password-complexity');

// const userSchema = new mongoose.Schema({
//     firstName: {
//     type:String,
//     required:true
// },
//     lastName:{
//         type: String,
//         required: true
//     },
//     email: {
//         type:String,
//         required:true
//     },
//     password: {
//         type : String ,
//         required: true
//     },
// })

// userSchema.methods.generateAuthToken = function() {
//     const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY,{expiresIn:'20d'});
//     return token
// };

// const User = mongoose.model("user",userSchema);

// const validate =(data) => {
//     const schema = Joi.object({
//         firstName: Joi.string().required().label("First Name"),
//         lastName: Joi.string().required().label("Last Name"),
//         email: Joi.string().email().required().label("Email"),
//         password: passwordComplexity().required().label("Password")
//     })
//     return schema.validate(data)
// }

// module.exports={User,validate}

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
	{
		role: {
			type: String,
			required: [true, "role is required"],
			enum: ["Recruiter", "User"],
		},
		firstName: {
			type: String,
			required: [true, "first name is required"],
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: [true, "email is required"],
		},
		password: {
			type: String,
			required: [true, "password is required"],
		},
	},
	{ timestamps: true }
);
const resumeSchema = new mongoose.Schema({
	jobId:{
        type:String,
        require:true
    },
    userEmail:{
        type:String,
        require:true
    },
    fileName: {
		type: String,
		require: true,
	},
	url: {
		type: String,
		required: true,
	},
});

// Model for Resume
const Resume = mongoose.model("Resume", resumeSchema);
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "20d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		role: Joi.string().required().label("Role"),
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate, Resume };
