import express from 'express'
import { toDoControllers } from './controllers/todoControllers';
const router = express.Router();


router
.route('/todos')
.get(toDoControllers.getAllTasks)
.post(toDoControllers.createTask)


router
.route('/todos/:id')
.get(toDoControllers.getTaskByID)
.delete(toDoControllers.deleteTask)
.patch(toDoControllers.editTask)

export default router