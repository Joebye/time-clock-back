import express from 'express';
import asyncHandler from 'express-async-handler';
import UsersService from '../service/UsersService';

export const users = express.Router();
const usersService = new UsersService();

users.post('/actions', asyncHandler(
    async(req,res) => {
        const user = await usersService.addUserData(req.body);
        if (user && req.body.id) {
            res.status(400);
            throw `email with id ${req.body.id} already exists`
        }
        res.send(user);
    }
))

users.get('/history/:teudatZeut', asyncHandler(
    async(req, res) => {
        const users = await usersService.getAllDataByUser(req.params.teudatZeut);
        res.send(users);
    }
))


