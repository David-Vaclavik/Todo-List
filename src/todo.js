import { format, parseISO, parse, isAfter, isBefore, addDays, startOfDay } from "date-fns";

class Todo {
  constructor(id, title, description, dueDate, priority, project) {
    this.id = id
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.project = project
    // You might also want to include ////notes or even a checklist.
    this.completed = false
  }

  toggleComplete() {
    this.completed = !this.completed
  }
}

// All books should be objects in an array
const storage = [
    new Todo(1, 'Car repair', 'Taking a car for repair', '06 Aug 2025', 'high', 'General'),
    new Todo(2, 'Grocery shopping', 'Buy groceries for the week', '16 Aug 2025', 'high', 'Shopping'),
    new Todo(3, 'Meeting with John', 'Discuss project details', '08 Aug 2025', 'low', 'Appointment'),
    new Todo(4, 'Dentist appointment', 'Annual check-up', '22 Aug 2025', 'high', 'Appointment'),
    new Todo(5, 'Gym session', 'Morning workout', '05 Aug 2025', 'medium', 'General'),
    new Todo(6, 'Read a book', 'Finish reading the current book', '09 Aug 2025', 'low', 'General'),
];

class TodoStorage {
  static addTodo(id, title, description, dueDate, priority, project) {
    const newTodo = new Todo(id, title, description, dueDate, priority, project);
    storage.push(newTodo);
    return newTodo;
  }

  static removeTodo(todoId) {
    const todo = storage.find(item => item.id === todoId);

    if (todo) {
      const index = storage.indexOf(todo);
      storage.splice(index, 1);
    }

    console.log(storage);
  }

  static getTodayItems(currentStorage) {
    const storageToday = [];
    const today = format(new Date(), "dd MMM yyyy");

    currentStorage.forEach(item => {
      // item.dueDate === today - here it compares strings
      if (item.dueDate === today) {
        storageToday.push(item);
      }
    })

    return storageToday;
  }

  static getWeekItems(currentStorage) {
    const storageWeek = [];
    const today = startOfDay(new Date());
    const weekFromToday = addDays(today, 7);

    currentStorage.forEach(item => {
      if (!item.dueDate) return; // skip if no dueDate
      const itemDate = parse(item.dueDate, "dd MMM yyyy", new Date());
      // itemDate is a Date object

      // Check if itemDate is >= today and < weekFromToday
      // By using +itemDate, you convert the Date object to its numeric timestamp value
      // +itemDate === +today - here it compares numeric timestamp value (number of milliseconds since 1970-01-01)
      // "+" Is a shorthand for date.getTime().
      if (
        (isAfter(itemDate, today) || +itemDate === +today) &&
        isBefore(itemDate, weekFromToday)
      ) {
        storageWeek.push(item);
      }
    });

    return storageWeek;
  }

}

export {Todo, TodoStorage, storage}
