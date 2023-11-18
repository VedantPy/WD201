/* eslint-disable no-undef */
const { beforeAll } = require("jest-circus");
const todoList = require("../todo");

const formatDate = (date) => {
  return date.toLocaleDateString("en-CA");
};

let today = formatDate(new Date());
let tomorrow = formatDate(
  new Date(new Date().setDate(new Date().getDate() + 1)),
);
let yesterday = formatDate(
  new Date(new Date().setDate(new Date().getDate() - 1)),
);

// Create an instance of todoList
const myTodoList = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    myTodoList.add({
      title: "todo - 1",
      completed: false,
      dueDate: yesterday,
    }),
      myTodoList.add({
        title: "todo - 2",
        completed: false,
        dueDate: tomorrow,
      });
  });
  test("Should add a todo item", () => {
    const todoItemCount = myTodoList.all.length;
    myTodoList.add({
      title: "todo - 3",
      completed: false,
      dueDate: today,
    });
    expect(myTodoList.all.length).toBe(todoItemCount + 1);
  });

  test("Should mark a todo item as complete", () => {
    expect(myTodoList.all[0].completed).toBe(false);
    myTodoList.markAsComplete(0);
    expect(myTodoList.all[0].completed).toBe(true);
  });
  test("Should return a list of overdue todo items", () => {
    const todolist = myTodoList.overdue();
    expect(
      todolist.every((todo) => {
        return todo.dueDate === yesterday;
      }),
    ).toBe(true);
  });
  test("Should return a list of todo items due today", () => {
    const todolist = myTodoList.dueToday();
    expect(
      todolist.every((todo) => {
        return todo.dueDate === today;
      }),
    ).toBe(true);
  });
  test("Should return a list of todo items due later", () => {
    const todolist = myTodoList.dueLater();
    expect(
      todolist.every((todo) => {
        return todo.dueDate === tomorrow;
      }),
    ).toBe(true);
  });
});
