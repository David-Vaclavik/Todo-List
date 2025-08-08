import { format, parseISO, parse, isAfter, isBefore, addDays, startOfDay } from "date-fns";

class Todo {
  constructor(id, title, description, dueDate, priority, project, completed = false) {
    this.id = id
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.project = project
    this.completed = completed
  }

  toggleComplete() {
    this.completed = !this.completed;

    // Update localStorage (assuming 'storage' is your array and key is 'todos')
    // Find index of this todo in storage
    const index = storage.findIndex(item => item.id === this.id);
    if (index !== -1) {
      storage[index].completed = this.completed;
      localStorage.setItem('todos', JSON.stringify(storage));
    }
    console.log(storage);
  }
}

// 1. Create a new Todo items
const demoData = [
  {id: 1, title: "Car repair", description: "Taking a car for repair", dueDate: "07 Aug 2025", priority: "high", project: "General", completed: true},
  {id: 2, title: "Grocery shopping", description: "Buy groceries for the week", dueDate: "16 Aug 2025", priority: "high", project: "Shopping", completed: false},
  {id: 3, title: "Meeting with John", description: "Discuss project details", dueDate: "08 Aug 2025", priority: "low", project: "Appointment", completed: false},
  {id: 4, title: "Dentist appointment", description: "Annual check-up", dueDate: "22 Aug 2025", priority: "high", project: "Appointment", completed: false},
  {id: 5, title: "Gym session", description: "Morning workout", dueDate: "05 Aug 2025", priority: "medium", project: "General", completed: false},
  {id: 6, title: "Read a book", description: "Finish reading the current book", dueDate: "09 Aug 2025", priority: "low", project: "General", completed: false},
];

// 2. Save the demo data to localStorage - Only set demo data if localStorage is empty:
if (!localStorage.getItem("todos")) {
  localStorage.setItem("todos", JSON.stringify(demoData));
}

// 3. Retrieve the Todo item from localStorage
const todosFromStorage = JSON.parse(localStorage.getItem("todos")) || [];

// 4. Create a storage array and add the Todo item to it
const storage = todosFromStorage.map(todo =>
  new Todo(
    todo.id,
    todo.title,
    todo.description,
    todo.dueDate,
    todo.priority,
    todo.project,
    todo.completed
  )
);
console.log(storage);


// projectStorage - note: 'Today', 'Week' - we don't want to include these in the project list, and never remove them
const demoProjects = ['General', 'Shopping', 'Appointment', 'Test'];

// localStorage.setItem("projects", JSON.stringify(demoProjects));

if (!localStorage.getItem("projects")) {
  localStorage.setItem("projects", JSON.stringify(demoProjects));
}

const projectsFromStorage = JSON.parse(localStorage.getItem("projects")) || [];
console.log(projectsFromStorage);


class TodoStorage {
  static addTodo(id, title, description, dueDate, priority, project) {
    const newTodo = new Todo(id, title, description, dueDate, priority, project);
    storage.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(storage));
    return newTodo;
  }

  static removeTodo(todoId) {
    const todo = storage.find(item => item.id === todoId);

    if (todo) {
      const index = storage.indexOf(todo);
      storage.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(storage));
    }

    console.log(storage);
  }

  static removeProject(projectName) {
    const project = projectsFromStorage.find(item => item === projectName)

    if (project) {
      const index = projectsFromStorage.indexOf(project);
      projectsFromStorage.splice(index, 1);
      localStorage.setItem('projects', JSON.stringify(projectsFromStorage));
    }
  }

  static getTodayItems(currentStorage) {
    const storageToday = [];
    const today = format(new Date(), "dd MMM yyyy");

    currentStorage.forEach(item => {
      // item.dueDate === today - here it compares strings
      if (item.dueDate === today || item.project === 'Today') {
        storageToday.push(item);
      }
    });
    return storageToday;
  }

  static getWeekItems(currentStorage) {
    const storageWeek = [];
    const today = startOfDay(new Date());
    const weekFromToday = addDays(today, 7);

    currentStorage.forEach(item => {
      //* can't skip is no dueDate because I want to see all that where created in "active"
      // if (!item.dueDate) return; // skip if no dueDate

      const itemDate = parse(item.dueDate, "dd MMM yyyy", new Date());
      // itemDate is a Date object

      // Check if itemDate is >= today and < weekFromToday
      // By using +itemDate, you convert the Date object to its numeric timestamp value
      // +itemDate === +today - here it compares numeric timestamp value (number of milliseconds since 1970-01-01)
      // "+" Is a shorthand for date.getTime().

      if (
        ((isAfter(itemDate, today) || +itemDate === +today) &&
        isBefore(itemDate, weekFromToday)) || item.project === 'Week'
      ) {
        storageWeek.push(item);
      }
    });
    return storageWeek;
  }

  static getProject(currentStorage, projectName) {
    const storageProject = [];

    currentStorage.forEach(item => {
      if (item.project === projectName) {
        storageProject.push(item);
      }
    });
    return storageProject;
  }

}

export {Todo, TodoStorage, storage, projectsFromStorage}
