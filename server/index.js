const express = require('express')
const app = express()
const port = 5000
const { User } = require('./models/User')
const { Board } = require('./models/board')
const { auth } = require('./middleware/auth')
const bodyParser = require('body-parser')
const config = require('./config/key')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : true
}).then(() => console.log('MongoDB Connect...'))
    .catch(err => console.log('err'))

app.get('/', (req, res) => {
    res.send('Hello World!~!~!')
})

app.post('/api/users/register',(req, res) => {
    // 회원 가입 할때 칠요한 정보등을 클라이언트에서 가져오면 그것들을 db에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err){
            return res.json({success : false, err})
        }

        return res.status(200).json({
            success : true
        })

    })
})

app.post('/api/users/login',(req,res) => {

    // 요청된 이메일을 db에서 있는지 확인
    User.findOne({email : req.body.email}, (err,user) => {
        if(!user){
            return res.json({
                loginSuccess : false,
                message : '이메일에 해당유저가 없습니다.'
            })
        }

        // 비밀번호가 같은지 확인
        user.comparePassword(req.body.password,(err,isMatch) => {
            if (!isMatch){
                return res.json({
                    loginSuccess : false,
                    message : "비밀번호가 틀렸습니다."
                })
            }

            // 비번까지 같다면 토큰 생성
            user.generateToken( (err,user)=> {

                if(err) {
                    return res.status(400).send(err);
                }

                // 토큰을 저장한다.
                // 쿠키 or 로컬스트리지
                res.cookie('name',user.name)
                res.cookie('email',user.email)
                res.cookie('x_auth',user.token)
                    .status(200)
                    .json({loginSuccess : true, userId : user._id})

            })
        })
    })
})

app.get('/api/users/auth',auth,(req,res) => {

    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role ===0 ? false : true,
        isAuth : true,
        
    })

})
app.get('/api/users/logout',auth,(req,res) => {
    User.findOneAndUpdate({"_id" : req.user._id}, {"token" : ''},(err,user) =>{

        if(err){
            return res.json({success : false,err})
        }
        // 쿠키 제거
        res.clearCookie('email');
        res.clearCookie('name');
        res.clearCookie('x_auth');

        return res.status(200).send({success : true})
    })
})


app.get('/api/hello',(req,res) => {

    res.json({'res' : "안녕?"})

})



/////////////////////////////////////// 게시판 ////////////////////////////////////////


// app.get('/api/board',(req, res) => {

//     Board.find({},(err,board) => {
//         if(err) {
//             return res.json({success : false, err})
//         }
//         return res.status(200).json({list : board});
//     }).sort({'writeDate':-1})
// })

app.get('/api/board',(req, res) => {

    Board.find({}).sort({'writeDate':-1}).exec((err,board) => {
        if(err) {
            return res.json({success : false, err})
        }
        return res.status(200).json({list : board});
    })
})

app.get('/api/board/:seq',(req, res) => {

    const seq = req.params.seq;
    if(!seq){
        return res.status(400).json({err : 'Incorrect seq'});
    }
    Board.findOne({seq : Number(seq)},(err,board) => {
        if(err) {
            return res.json({success : false, err})
        }
        return res.status(200).json({list : board});
    });
})

app.post('/api/board',(req, res) => {
    // 게시글 정보를 클라이언트에서 가져오면 그것들을 db에 넣어준다.
    const body = req.body;
    // 쿠키에 저장된 이름 가져오기
    body.writer = req.cookies.name;
    //console.log(body)
    const board = new Board(body);
    board.save((err, boardInfo) => {
        if (err){
            console.log(err)
            return res.json({success : false, err})
        }
        return res.status(200).json({
            success : true
        })

    })
})

app.delete('/api/board/:seq',(req, res) => {

    const seq = req.params.seq;
    if(!seq){
        return res.status(400).json({err : 'Incorrect seq'});
    }
    Board.deleteOne({seq : Number(seq)},(err,board) => {
        if(err) {
            return res.json({success : false, err})
        }
        return res.status(200).json({success : true});
    })
})

app.put('/api/board/:seq',(req, res) => {
    const seq = req.params.seq;
    if(!seq){
        return res.status(400).json({err : 'Incorrect seq'});
    }
    // 게시글 정보를 클라이언트에서 가져오면 그것들을 db에 넣어준다.

    Board.updateOne({seq : Number(seq)},req.body,(err, board)=> {
        if(err) {
            return res.json({success : false, err})
        }
        return res.status(200).json({updateSuccess : true});
    })

})

app.put('/api/board/:seq',(req, res) => {
    const seq = req.params.seq;
    if(!seq){
        return res.status(400).json({err : 'Incorrect seq'});
    }
    // 게시글 정보를 클라이언트에서 가져오면 그것들을 db에 넣어준다.

    Board.updateOne({seq : Number(seq)},req.body,(err, board)=> {
        if(err) {
            return res.json({success : false, err})
        }
        return res.status(200).json({updateSuccess : true});
    })

})

/////////////////////////////////////// 게시판 ////////////////////////////////////////




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})