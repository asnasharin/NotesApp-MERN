import express from "express"
import User from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()


router.post('/register', async (req, res) => {
    try {
        const  {name, email, password} = req.body
        const user = await User.findOne({email})
        if (user) {
            return res.status(401).json({success: false, message: "User already exist"})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name, email, password: hashPassword
        })

        await newUser.save()

        return res.status(200).json({ success: true, message: "Account created"})
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error"})
    }
})


router.post('/login', async(req,res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})

        if(!user) {
            return res.status(401).json({ success: false, message: "user not found"})
        } 

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "wrong credentials"})
        }

        const token = jwt.sign({ id: user._id}, "secretkey", {expiresIn: "5h"})
        return res.status(200).json({ success: true, token, user: {name: user.name}, message: "user login successfull"})
    } catch (error) {
        return res.status(500).json({ success: false, message: "server error"})
    }
})


export default router