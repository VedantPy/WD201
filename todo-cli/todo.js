const todoList = () => {
  let all = [];
  let today = new Date().toLocaleDateString("en-CA");
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array of overdue items accordingly.
    // FILL YOUR CODE HERE
    return all.filter((item) => item.dueDate < today);
  };

  const dueToday = () => {
    // Write the date check condition here and return the array of todo items that are due today accordingly.
    // FILL YOUR CODE HERE
    return all.filter((item) => item.dueDate === today);
  };

  const dueLater = () => {
    // Write the date check condition here and return the array of todo items that are due later accordingly.
    // FILL YOUR CODE HERE
    return all.filter((item) => item.dueDate > today);
  };

  function toDisplayableList(list) {
    // Format the To-Do list here, and return the output string as per the format given above.
    // FILL YOUR CODE HERE
    return list
      .map(
        (item) =>
          `${item.completed ? `[x]` : `[ ]`} ${item.title} ${
            item.dueDate != today ? item.dueDate : " "
          }`,
      )
      .join("\n");
    // return OUTPUT_STRING
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
