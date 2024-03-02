'use strict'

import express from 'express'
import { deleteC, get, save, update } from './category.controller.js'

const api = express.Router()

api.post('/save', save)
api.get('/get', get)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteC)

export default api