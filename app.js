const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const pug = require('pug');
const tasks = [];
const doneTasks = []; 
 

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  res.render('home', { tasks, doneTasks }); 
});


app.post('/addTask', (req, res) => {
  const newTask = req.body.tsk;
  tasks.push(newTask); 
  res.redirect('/'); 
});

app.post('/deleteTask', (req, res) => {
  const taskToDelete = req.body.taskToDelete;
  const taskIndex = tasks.indexOf(taskToDelete);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
  res.redirect('/');
});
app.post('/markDone', (req, res) => {
  const taskToMarkDone = req.body.taskToMarkDone;
  const taskIndex = tasks.indexOf(taskToMarkDone);
  
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    doneTasks.push(taskToMarkDone); 
  }
  
  res.redirect('/');
});
app.post('/deleteDoneTask', (req, res) => {
  const doneTaskToDelete = req.body.doneTaskToDelete;
  const doneTaskIndex = doneTasks.indexOf(doneTaskToDelete);
  
  if (doneTaskIndex !== -1) {
    doneTasks.splice(doneTaskIndex, 1);
  }
  
  res.redirect('/');
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
