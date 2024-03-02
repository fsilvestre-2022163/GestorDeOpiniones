'use strict'

import Post from '../post/post.model.js'
import Category from '../category/category.model.js'

export const save = async (req, res) => {
    try {
         let data = req.body
         let category = await Category.findOne({_id: data.category})
         if(!category) return res.status(404).send({message: 'Category not found'})
         let post = new Post(data)
         await post.save()
         return res.send({message: 'Post saved successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving post', err })
    }
}

export const get = async (req, res) => {
    try {
        let posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error getting posts' });
    }
};

export const update = async (req, res) => {
    try {
        let {id} = req.params
        let data = req.body
        let updatePost = await Post.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('category', ['name', 'description'])
        if(!updatePost) return res.status(404).send({message: 'Post not found, not updated'})
        return res.send({message: 'Post updated successfully', updatePost})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating post'})
    }
};

export const deleteP = async(req, res)=>{
    try{
        let { id } = req.params
        let deletePost = await Post.findOneAndDelete({_id: id})
        if(!deletePost) return res.status(404).send({message: 'Post not found, not deleted'})
        return res.send({message: 'Deleted Post successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting Post'})
    }
}