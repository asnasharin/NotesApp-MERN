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

// fetch
router.get("/",middleware, async(req, res) => {
    try {
        const notes = await Note.find({userId: req.user.id})
        return res.status(200).json({success: true, notes})
    } catch (error) {
        return res.status(500).json({success: false, message: "can't retrieve notes"})
    }
})

// edit

router.patch("/edit/:id", async(req, res) => {
    try {
        const { id } = req.params
        const { title, desc } = req.body
        
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { $set: { title, desc }},
            { new: true}
        )

        if(!updatedNote) {
            return res.status(404).json({success: false, message: "note not found"})
        }

        return res.status(200).json({success: true, note: updatedNote})
    } catch (error) {
        return res.status(500).json({success:false, message: "error in updating"})
    }
})

// delete
router.delete("/delete/:id", async(req, res) => {
    try {
         const {id} = req.params
         const deletedNote = await Note.findByIdAndDelete(id)

         if (!deletedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
          }
      
          return res.status(200).json({ success: true, message: "Note deleted successfully" });
        } catch (error) {
          console.error("Error deleting note:", error);
          return res.status(500).json({ success: false, message: "Server error" });
        }
})
export default router