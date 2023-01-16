//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract TasksContract{

    uint public taskCounter = 0;

    event TaskCreated(
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 createdAt

    );

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }

    //Conjunto de datos clave-valor
    mapping (uint256 => Task ) public tasks;

    constructor() {
        createTask("Tarea de ejemplo", "Puedes crear mas tareas");
    }

    function createTask(string memory _title, string memory _description) public {
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        taskCounter++;
        //Para recibir la tarea que se creo
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    event TaskToggledDone(uint256 id, bool done);

    function toggleDone(uint _id) public{
       Task memory _task = tasks[_id];
       _task.done = !_task.done;
       tasks[_id] = _task;
       emit TaskToggledDone(_id, _task.done);
    }

}

