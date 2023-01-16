const TasksContract =  artifacts.require("TasksContract")

contract("TasksContract", ()=>{
    before(async () => {
        this.tasksContract =  await TasksContract.deployed();
    })


    it('migrate deployed successfully', async()=>{
        const address =  this.tasksContract.address
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })

    it('get Tasks List', async() =>{
        const counter = await this.tasksContract.taskCounter()
        const task = await this.tasksContract.tasks(0);
        assert.equal(counter, 1)
        assert.equal(task.title, 'Tarea de ejemplo')
    })

    it('create Task', async()=>{
       const result = await this.tasksContract.createTask('segunda tarea', 'tarea2');
       const counter = await this.tasksContract.taskCounter()
       const task = await this.tasksContract.tasks(1);
       const taskEvent = result.logs[0].args;
       assert.equal(counter, 2)
       assert.equal(taskEvent.id.toNumber(), 2)
    })

    it("task toggled done", async () => {
        const result = await this.tasksContract.toggleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.tasksContract.tasks(1);
    
        assert.equal(task.done, true);
        assert.equal(taskEvent.id.toNumber(), 1);
        assert.equal(taskEvent.done, true);
      });

})