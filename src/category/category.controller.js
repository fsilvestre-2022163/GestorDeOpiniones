'use strict'

import Category from '../category/category.model.js'

export const save = async (req, res) => {
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({ message: 'category saved successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving category', err })
    }
}

export const get = async (req, res) => {
    try {
        let category = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error getting category' });
    }
};

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        if (!update) return res.status(402).send({ message: 'Have sumbmitted some data that cannot be updated or missing data' })
        let updateCategory = await Category.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateCategory) return res.status(401).send({message: 'User not found and not updated'})
        return res.send({message: 'Updated category', updateCategory})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating category'})
    }
};

export const deleteC = async (req, res) => {
    try {
        let { id } = req.params
        let deleteCategory = await Category.findOneAndDelete({ _id: id })
        if (!deleteCategory) return res.status(404).send({ message: 'Category not found, not deleted' })
        return res.send({ message: 'Deleted Category successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting Category' })
    }
}