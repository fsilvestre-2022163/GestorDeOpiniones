'use strict'

import { Schema, model } from 'mongoose'

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        minLength: 8,
        required: true
    },

    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    }
})

export default model('user', userSchema)