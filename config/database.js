const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/to-do-list', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Conectado ao mongoDB')
})
.catch(err => console.log(err))