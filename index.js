const express = require('express')
const app = express()
const port = 3000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sun:rktjf12!%40@mysun.hhk6y.mongodb.net/React-blog?retryWrites=true&w=majority',{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : true
}).then(() => console.log('MongoDB Connect...'))
  .catch(err => console.log('err'))

app.get('/', (req, res) => {
    res.send('Hello World!~!~!')
})

//

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})