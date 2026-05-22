const User=require("../models/User");

const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");

const crypto=require("crypto");

const sendEmail=
require("../services/emailService");

const{

generateAccessToken,
generateRefreshToken

}=require(
"../utils/generateToken"
);



/*
================================
REGISTER
POST:
/api/auth/register
================================
*/

exports.register=
async(req,res)=>{

try{

const{

name,
email,
password,
role,
adminPasskey

}=req.body;

const adminSignupPasskey = process.env.ADMIN_SIGNUP_PASSKEY || process.env.ADMIN_PASSKEY || 'ADMIN@2026';

if(role === 'admin'){

if(!adminPasskey){

return res.status(400).json({

success:false,

message:'Admin passkey is required'

});

}

if(adminPasskey !== adminSignupPasskey){

return res.status(403).json({

success:false,

message:'Invalid admin passkey'

});

}

}


const existingUser=

await User.findOne({
email
});


if(existingUser){

return res.status(400)
.json({

success:false,

message:
"User already exists"

});

}



const hashedPassword=

await bcrypt.hash(
password,
10
);



const user=

await User.create({

name,

email,

password:
hashedPassword,

role

});



const accessToken=

generateAccessToken(
user._id
);


const refreshToken=

generateRefreshToken(
user._id
);


user.refreshToken=
refreshToken;


await user.save();



res.status(201)
.json({

success:true,

message:
"Registered successfully",

accessToken,

refreshToken,

user

});

}

catch(error){

res.status(500)
.json({

success:false,

message:error.message

});

}

};





/*
================================
LOGIN
POST:
/api/auth/login
================================
*/

exports.login=
async(req,res)=>{

try{

const{

email,
password

}=req.body;



const user=

await User.findOne({
email
});


if(!user){

return res.status(401)
.json({

success:false,

message:
"Invalid credentials"

});

}



const isMatch=

await bcrypt.compare(

password,

user.password

);


if(!isMatch){

return res.status(401)
.json({

success:false,

message:
"Invalid credentials"

});

}



const accessToken=

generateAccessToken(
user._id
);


const refreshToken=

generateRefreshToken(
user._id
);


user.refreshToken=
refreshToken;

await user.save();



res.status(200)
.json({

success:true,

message:
"Login successful",

accessToken,

refreshToken,

user

});

}

catch(error){

res.status(500)
.json({

success:false,

message:error.message

});

}

};





/*
================================
LOGOUT
GET:
/api/auth/logout
================================
*/

exports.logout=
async(req,res)=>{

try{


const user=

await User.findById(
req.user?._id
);


if(user){

user.refreshToken=
undefined;

await user.save();

}


res.status(200)
.json({

success:true,

message:
"Logged out successfully"

});

}

catch(error){

res.status(500)
.json({

success:false,

message:error.message

});

}

};





/*
================================
FORGOT PASSWORD
POST:
/api/auth/forgot-password
================================
*/

exports.forgotPassword=
async(req,res)=>{

try{


const user=

await User.findOne({

email:
req.body.email

});


if(!user){

return res.status(404)
.json({

success:false,

message:
"User not found"

});

}



const resetToken=

user.getResetPasswordToken();


await user.save({validateBeforeSave:false});


res.status(200)
.json({

success:true,

message:
"Reset token generated",

resetToken

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message
});

}

};


exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Token is invalid or expired',
      })
    }

    user.password = await bcrypt.hash(req.body.password, 10)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.refreshToken = async (req, res) => {
  try {
    const token = req.body.refreshToken || req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.id)

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      })
    }

    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    user.refreshToken = refreshToken
    await user.save()

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    })
  }
}
