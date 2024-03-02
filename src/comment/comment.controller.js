'use strict'

import Comment from '../comment/comment.model.js'
import Post from '../post/post.model.js'
import User from '../user/user.model.js'

export const save = async(req, res)=>{
    try {
        let data = req.body
        let user = await User.findOne({_id: data.user})
        if(!user) return res.status(404).send({message: 'User not found'})
        let post = await Post.findOne({_id: data.post})
        if(!post) return res.status(404).send({message: 'Post not found'})
        let comment = new Comment(data)
        await comment.save()
        return res.send({message: 'Comment saved successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving comment', err})
    }
}

export const get = async(req, res)=>{
    try{
        let comments = await Comment.find().populate('user', ['name'], 'post',['title']) 
        return res.send({ comments })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting comments'})
    }
}

export const update = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let updateComent = await Comment.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('user', ['name'], 'post', ['title'])
        if(!updateComent) return res.status(404).send({message: 'Comment not found, not updated'})
        return res.send({message: 'Comment updated successfully', updateComent})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating comment'})
    }
}

export const deleteCO = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteComment = await Comment.deleteOne({_id: id})
        if(deleteComment.deletedCount == 0) return res.status(404).send({message: 'Comment not found, not deleted'})
        return res.send({message: 'Deleted comment successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting comment'})
    }
}
