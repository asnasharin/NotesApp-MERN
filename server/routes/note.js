import express from 'express'
import Note from '../models/Note'

const router = express.Router()

router.post('/add', async (req,res) => {
    try {
           const { title, desc } = req.body

           const newNote = new Note({
            title,
            desc
           })
           await newNote.save()
            return res.status(200).json({ success: true, token, user: {name: user.name}, message: "user login successfull"})
       } catch (error) {
           return res.status(500).json({ success: false, message: "server error"})
       }
   
})