'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'


export const register = async(req, res)=>{ 
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: 'Registered successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, email, phone, password } = req.body
        let user = await User.findOne({
            $or: [{ username }, { email }, { phone }]
        })
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const update = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumbmitted some data that cannot be updated or missing data'})
        let updatedUser = await User.findOneAndUpdate(
            {_id: id}, 
            data, 
            {new: true} 
        )
        if(!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        return res.send({message: 'Updated user', updatedUser})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}