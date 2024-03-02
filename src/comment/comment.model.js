'use strict'

import { Schema, model } from 'mongoose'

const commentSchema = Schema({
    content: {
        type: String,
        required: true,
    }, 
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    post: {
        type: Schema.ObjectId,
        ref:'post',
        required: true
    }
})

export default model('comment', commentSchema)