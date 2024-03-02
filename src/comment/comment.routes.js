'use strict'

import express from 'express'
import { save, get, update, deleteCO } from './comment.controller.js'


const api = express.Router()

api.post('/save', save)
api.get('/get', get)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteCO)

export default api

