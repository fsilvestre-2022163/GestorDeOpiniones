'use strict'

import express from 'express'
import { deleteP, get, save, update } from './post.controller.js'

const api = express.Router()

api.post('/save', save)
api.get('/get', get)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteP)



export default api


