import express, {Response,Request, response} from 'express'



const tasks: any[]= [
    {
    id:1,
    name: 'teste',
    status: true
    },
    {
        id:2,
        name: 'tsss',
        status: false
        },
]
class ToDo{

    public getAllTasks = (request: Request, response: Response) => {
        const { status } = request.query; 
    
        if (status === undefined) {
            response.json(tasks); // This should return all tasks
            return;
        }
    
        const isFinished = status === 'true';
        const filteredTasks = tasks.filter((task) => task.status === isFinished);
        response.json(filteredTasks);
    }



    public getTaskByID = async (request:Request,response:Response) =>{
        let taskId = request.params.id
        let task = tasks.filter((task) => task.id == taskId)
        response.json(task)
    }

    public createTask = (request:Request,response:Response) =>{
        let name = request.body.name
        console.log(request.body)
        let taskExists = tasks.some((task) => task.name == name);
        if (taskExists){
            response.status(400).json({message:"Task Already Exists"})
            return;
        }
        const newTask = {
            id: tasks.length + 1,
            name,
            status: false, // Set default status to false
        };
        
        tasks.push(newTask)
        response.status(201).json(newTask);
        return;
    }

    public editTask = (request: Request, response: Response): void => {
        const id = parseInt(request.params.id);  
        const { name,status } = request.body;
        console.log(request.body)
        
        const taskIndex = tasks.findIndex((task) => task.id === id);
    
        if (taskIndex === -1) {
           
            response.status(404).json({ message: `Task with id ${id} not found` });
            return;
        }
    
      
        const taskExists = tasks.some((task) => task.name === name && task.id !== id);
    
        if (taskExists) {
        
            response.status(400).json({ message: 'Task with this name already exists!' });
            return;
        }

        tasks[taskIndex].name = name;  
        tasks[taskIndex].status= status;
       
        response.json(tasks[taskIndex]);
    };
    


    public deleteTask = (request: Request, response: Response): void => {
        const id = parseInt(request.params.id);  

        const taskIndex = tasks.findIndex((task) => task.id === id);

        if (taskIndex === -1) {
            response.status(404).json({ message: `Task with id ${id} not found` });
            return;
        }

     
        tasks.splice(taskIndex, 1);

        response.status(200).json({ message: `Task with id ${id} deleted successfully` });
    };


    public getTasksByStatus = (request: Request, response: Response): void => {
       
    };

}



const toDoControllers = new ToDo();

export { toDoControllers };