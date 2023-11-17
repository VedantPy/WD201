/* eslint-disable no-undef */
const { beforeAll } = require("jest-circus");
const todoList = require("../todo");

// Create an instance of todoList
const myTodoList = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    myTodoList.add({
      title: "Test",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Should add a todo item", () => {
    const todoItemsCount = myTodoList.all.length;
    myTodoList.add({
      title: "Test",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(myTodoList.all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo item as complete", () => {
    expect(myTodoList.all[0].completed).toBe(false);
    myTodoList.markAsComplete(0);
    expect(myTodoList.all[0].completed).toBe(true);
  });
  test("Should return a list of overdue todo items", () => {
    expect(myTodoList.overdue().length).toBe(0);
  });
  test("Should return a list of todo items due today", () => {
    expect(myTodoList.dueToday().length).toBe(1);
  });
  test("Should return a list of todo items due later", () => {
    expect(myTodoList.dueLater().length).toBe(0);
  });
});
