import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js'

const router = express.Router()

router.post('/add', middleware, async (req,res) => {
    try {
           const { title, desc } = req.body

           const newNote = new Note({
            title,
            desc,
            userId: req.user.id
           })
           await newNote.save()
            return res.status(200).json({ success: true, message: "note created successfully"})
       } catch (error) {
        console.log(error)
           return res.status(500).json({ success: false, message: "error in adding note"})
       }
   
})


router.get("/", async(req, res) => {
    try {
        const notes = await Note.find()
        return res.status(200).json({success: true, notes})
    } catch (error) {
        return res.status(500).json({success: false, message: "can't retrieve notes"})
    }
})

export default router