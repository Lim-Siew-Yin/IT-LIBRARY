const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserModel = require('./models/user-model');
const BookModel = require('./models/book-model');


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://systemdb:masterkey@cluster0.zigvfo4.mongodb.net/dbtest?retryWrites=true&w=majority')

app.post('/api/register', async (req, res) => {
    if(!req.body){
        return res.status(400).send('Please fill in the requirements.')
    }else{
        console.log(req.body)
    }
    
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        })
        res.json({status: 'ok'})

    }catch (err){
        console.log(err)
        res.json({status: 'error', error: 'Duplicated email'})
    }
})

// login
app.post('/api/', async (req, res) => {
    if(!req.body.email){
        return res.status(400).send('Please enter your email')
    }

    const user = await UserModel.findOne({
        email: req.body.email,
    })
    
    if (!user) { 
        return { status: 'error', error: 'Invalid login'}
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, 'secret1234')
        
		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.post('/api/search', async (req, res) => {
    if(!req.body){
        return res.status(400).send('Field is empty')
    }else{
        console.log(req.body)
    }
    
    try{
        await BookModel.create({
            email: req.body.email,
            book: req.body.searchTitle
        })
        res.json({status: 'ok'})

    }catch (err){
        console.log(err)
        res.json({status: 'error'})
    }
    
})


app.post('/api/delete', async(req, res) => {
    console.log(req.body);
    try {
        const deleteBook = await BookModel.deleteMany({
            email: req.body.email
          })
          res.json({status:'ok'})
        }
    catch (err){
          res.json({json: 'error', error: "Fail to delete"})
          
      }
 })



app.listen(4000, () => {
    console.log('server run on port 4000');
})
