/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();

const formattedDate = (d) => {
  return d.toLocaleDateString("en-CA");
};
let dateToday = new Date();
let today = formattedDate(new Date());
let yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
let tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);

describe("Todolist Test Suit", () => {
  beforeAll(() => {
    add({
      title: "todo - 1",
      completed: false,
      dueDate: yesterday,
    }),
      add({
        title: "todo - 2",
        completed: false,
        dueDate: tomorrow,
      });
  });
  test("Should add a todo item", () => {
    const todoItemCount = all.length;
    add({
      title: "todo - 3",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemCount + 1);
  });
  test("Should mark a todo item as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test(" Should return a list of overdue todo items", () => {
    const overDueTodoItemsCount = overdue().length;
    add({
      title: "todo - 4",
      completed: false,
      dueDate: yesterday,
    });
    expect(overdue().length).toEqual(overDueTodoItemsCount + 1);
  });
  test(" Should return a list of todo items due today", () => {
    const dueTodayTodoItemsCount = dueToday().length;
    add({
      title: "todo - 5",
      completed: false,
      dueDate: today,
    });
    expect(dueToday().length).toEqual(dueTodayTodoItemsCount + 1);
  });
  test("Should return a list of todo items due later", () => {
    const dueLaterTodoItemsCount = dueLater().length;
    add({
      title: "todo - 6",
      completed: false,
      dueDate: tomorrow,
    });
    expect(dueLater().length).toEqual(dueLaterTodoItemsCount + 1);
  });
});
