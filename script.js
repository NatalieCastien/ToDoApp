const taskList = document.getElementById('task-container').getElementsByTagName('ul')[0];
const inputField = document.getElementById('new-task');
const addButton = document.getElementById('add-button');
const deleteButtons = document.getElementsByClassName('delete-button');

// Get all tasks through the api
const getTasks = () => {
    getAllTasks().then ((result) => {
        let tasks = Object.keys(result).map((key) => ({
            id: key, 
            description: result[key].description,
            done: result[key].done
        }));
        showTasks(tasks);
    });
};
// Get initial list of tasks
getTasks();

// Function to reset the list
const resetList = (element) => {
    if (element.children.length > 0) {
        const array = (element.children);
        const listArray = Array.from(array);
        listArray.forEach((child) => {
            element.removeChild(child);
        });
    }
}

// Function to delete an item
const deleteItem = (event) => {
    const itemId = event.target.parentNode.id;
    deleteTask(itemId).then ((result) => {
        getTasks();
    }).catch(error => console.log(error));
};

// Function to edit a list-item
const editSpecificTask = (event) => {
    const parent = event.target.parentNode.parentNode;
    const taskId = parent.id;
    // Get the status by the class of the parentnode
    const done = parent.classList[0];
    let status = "";
    if (done == "true") {
        status = true;
    } else {
        status = false;
    }
    
    const description = parent.getElementsByTagName('input')[1].value;

    const data = {"description": description, "done": status};
    updateTask(taskId, data).then((result) => {
        getTasks();
    });
}

// Add eventlistener on input, when pressed Enter
inputField.addEventListener('keyup', (event) => {
    if (event.key == "Enter") {
        addButton.click();
    }
})

// Function to make it possible to edit a Task
const editListItem = (event) => {
    const taskDescription = event.target.innerText;
    const parentLi = event.target.parentNode;
    const taskId = parentLi.id;

    // Create an inputfield to edit the current task + a save button
    const editField = document.createElement('div');
    const inputField = document.createElement('input');
    const saveButton = document.createElement('button');

    inputField.type = "text";
    inputField.value = taskDescription;
    saveButton.innerText = "Save";
    saveButton.classList = "save-button";

    // Insert the editfield instead of the taskelement, and before the trashbin
    const trashbin = parentLi.getElementsByTagName('img')[0];
    parentLi.removeChild(event.target);
    editField.appendChild(inputField);
    editField.appendChild(saveButton);

    parentLi.insertBefore(editField, trashbin);
    inputField.focus();

    // Save button on click: update the description
    saveButton.addEventListener('click', editSpecificTask);
    inputField.addEventListener('keyup', (event) => {
        if (event.key == "Enter") {
            saveButton.click();
        }
    })
}

// Function to display the complete list of tasks
const showTasks = (tasks) => {
    resetList(taskList);
    tasks.forEach((task) => {
        const newListItem = document.createElement('li');
        const newListContent = document.createElement('p');
        const newCheckboxLabel = document.createElement('label')
            const newCheckbox = document.createElement('input');
            const newSpanCheckbox = document.createElement('span');

        newListItem.classList = task.done;

        newListContent.innerText = task.description;
        newListContent.classList = (task.done + " col-2");

        newCheckbox.type = "checkbox";
        newCheckboxLabel.classList = "col-1";
        newCheckboxLabel.appendChild(newCheckbox);
        newCheckboxLabel.appendChild(newSpanCheckbox);
        
        newListContent.addEventListener('click', editListItem);        
                
        // Toggle status with checkbox
        newCheckbox.addEventListener('change', () => {
                newListContent.classList.toggle("done");
                if (newCheckbox.checked == true) {
                    const data = {"description": task.description, "done": true};
                    updateTask(task.id, data).then((result) => {
                        getTasks();
                    });
                } else {
                    const data = {"description": task.description, "done": false};
                    updateTask(task.id, data).then((result) => {
                        getTasks();
                    });
                }
                
        });

        // Add checkbox and text content to the new list item
        newListItem.appendChild(newCheckboxLabel);
        if (task.done == true) {
            newCheckbox.checked = true;
        };
        newListItem.appendChild(newListContent);
        newListItem.id = task.id;

        
        // Add deletebutton to list item
        const newTrashIcon = document.createElement('img');
        newTrashIcon.src = "trash-delete-icon.jpg";
        newTrashIcon.alt = "delete button";
        newTrashIcon.classList = "delete-button col-3";

        // append new items to the list
        newListItem.appendChild(newTrashIcon);
        newTrashIcon.addEventListener('click', deleteItem);
        taskList.appendChild(newListItem);
    })
}

const addTask = () => {
    const newTask = inputField.value;
    const data = {"description": newTask, "done": false};
    postNewTask(data).then((result) => {
        getTasks();
    });
    inputField.value = "";    
};

addButton.addEventListener('click', addTask);

const fillFooter = () => {
    const footer = document.getElementsByTagName('footer')[0];
    const year = new Date().getFullYear();
    const footertext = document.createElement("p");
    footertext.innerHTML = "&copy; Natalie Castien " + year;
    footer.appendChild(footertext);
};
fillFooter();