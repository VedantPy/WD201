/* eslint-disable no-undef */
const { beforeAll } = require("jest-circus");
const todoList = require("../todo");

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-CA");
};

let dateToday = new Date();
let today = formatDate(dateToday);
let tomorrow = formatDate(dateToday.setDate(dateToday.getDate() + 1));
let yesterday = formatDate(dateToday.setDate(dateToday.getDate() - 1));

// Create an instance of todoList
const myTodoList = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    myTodoList.add({
      title: "Test - 1",
      completed: false,
      dueDate: yesterday,
    });
    myTodoList.add({
      title: "Test - 2",
      completed: false,
      dueDate: tomorrow,
    });
  });
  test("Should add a todo item", () => {
    const todoItemsCount = myTodoList.all.length;
    myTodoList.add({
      title: "Test-3",
      completed: false,
      dueDate: today,
    });
    expect(myTodoList.all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo item as complete", () => {
    expect(myTodoList.all[0].completed).toBe(false);
    myTodoList.markAsComplete(0);
    expect(myTodoList.all[0].completed).toBe(true);
  });
  test("Should return a list of overdue todo items", () => {
    const todolist = myTodoList.overdue();
    expect(todolist.every((todo) => todo.dueDate === yesterday)).toBe(true);
  });
  test("Should return a list of todo items due today", () => {
    const todolist = myTodoList.dueToday();
    expect(todolist.every((todo) => todo.dueDate === today)).toBe(true);
  });
  test("Should return a list of todo items due later", () => {
    const todolist = myTodoList.dueLater();
    expect(todolist.every((todo) => todo.dueDate === tomorrow)).toBe(true);
  });
});
