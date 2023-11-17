const todoList = () => {
    all = [];

    const add = (todoItem) => {
        all.push(todoItem);
    };

    const markAsComplete = (index) => {
        all[index].completed = true;
    };

    const overdue = () => {
        const today = new Date().toISOString().split("T")[0];
        return all.filter((item) => !item.completed && item.dueDate < today);
    };

    const dueToday = () => {
        const today = new Date().toISOString().split("T")[0];
        return all.filter((item) => item.dueDate === today);
    };

    const dueLater = () => {
        const today = new Date().toISOString().split("T")[0];
        return all.filter((item) => !item.completed && item.dueDate > today);
    };

    const formatDueDate = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    };

    const toDisplayableList = (list) => {
        return list.map((item) => {
            const checkbox = item.completed ? '[x]' : '[ ]';
            if (!item.completed) {
                if (item.dueDate === new Date().toISOString().split("T")[0]) {
                    return `${checkbox} ${item.title}`;
                } else {
                    return `${checkbox} ${item.title} ${formatDueDate(item.dueDate)}`;
                }
            } else {
                return `${checkbox} ${item.title}`;
            }
        }).join('\n');
    };

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