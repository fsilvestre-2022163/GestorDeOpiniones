'use strict'

import { Schema, model } from "mongoose"

const postSchema = Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'category',
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

export default model('post', postSchema)