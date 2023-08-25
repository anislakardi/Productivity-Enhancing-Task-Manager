const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
const PORT = 3000;
const pug = require('pug');
const tasks = []; // Array to store tasks
const doneTasks = []; // Array to store completed tasks
 
// Configure app
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser

// Define routes
app.get('/', (req, res) => {
  res.render('home', { tasks, doneTasks }); // Pass tasks and doneTasks arrays to the view
});


app.post('/addTask', (req, res) => {
  const newTask = req.body.tsk; // Get task from form data
  tasks.push(newTask); // Add task to tasks array
  res.redirect('/'); // Redirect back to the home page
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
    doneTasks.push(taskToMarkDone); // Add completed task to doneTasks
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
