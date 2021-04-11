const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({

    name : {
        type : String,
        maxLength : 50
    },
    email : {
        type:String,
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        //maxLength: 100

    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
})

userSchema.pre('save',function (next){
    let user = this;

    if(user.isModified('password')){
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {

            if(err) {
                return next(err)
            }

            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) {
                    return next(err)
                }
                user.password = hash;
                next()
            });
        });
    }else {
        next();
    }
})

userSchema.methods.comparePassword = function (plainPassword,callback){

    let user = this;
    bcrypt.compare(plainPassword,user.password,function (err,isMatch){

        if(err){
            return callback(err)
        }
        callback(null,isMatch)
    })
}

userSchema.methods.generateToken = function (callback){
    let user = this;
    let token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;

    user.save(function (err, user){
        if(err){
            return callback(err)
        }
        callback(null,user)
    })
}

userSchema.statics.findByToken = function (token,callback){
    let user = this;

    // 토큰 디코드
    jwt.verify(token, 'secretToken',function (err,decoded){
        // 유저아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 토큰과
        // db에 보관된 토큰이 일치하는지 확인

        user.findOne({"token" : token, "_id" : decoded},function (err, user){

            if (err){
                return callback(err)
            }
            callback(null, user)

        })

    });

}


const User = mongoose.model('User',userSchema)
module.exports = {User}