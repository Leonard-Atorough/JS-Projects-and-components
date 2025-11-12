import fs from "fs";

const args: string[] = process.argv;

const currentWorkingDirectory = args[1]?.slice(0, -8);
const todosFilePath = currentWorkingDirectory + "todo.txt";
const doneFilePath = currentWorkingDirectory + "done.txt";

if (fs.existsSync(todosFilePath) === false) {
  let createStream = fs.createWriteStream("todo.txt");
  createStream.end();
}
if (fs.existsSync(doneFilePath) === false) {
  let createStream = fs.createWriteStream("done.txt");
  createStream.end();
}

const todoInfo = () => {
  const usageText = `
        Usage:
        $ node index.js add "todo item" # Add a new todo item
        $ node index.js ls              # List all remaining todos
        $ node index.js del NUMBER      # Delete a todo
        $ node index.js done NUMBER     # Complete a todo item
        $ node index.js help            # Show usage guide
        $ node index.js report          # Show statistics
    `;
  console.log(usageText);
};

const listTodos = () => {
  let data: string[] = [];

  const fileData = fs.readFileSync(todosFilePath).toString();

  data = fileData.split("\n");

  let filteredData = data.filter((value) => value !== "");

  if (filteredData.length <= 0) console.log("No penidng todos!");

  filteredData.forEach((item, idx) => {
    console.log(filteredData.length - idx + ". " + item);
  });
};

const addTodo = () => {
  const newTodo = args[3];

  if (newTodo) {
    let fileData = fs.readFileSync(todosFilePath).toString();

    fileData = newTodo + "\n" + fileData;

    fs.writeFile(todosFilePath, fileData, (error) => {
      if (error) throw error;
    });
    console.log("Added todo: '" + newTodo + "'");
  } else {
    console.log("'Error: Missing todo string. Nothing added!'");
  }
};

const deleteTodo = () => {
  const deleteIdx = Number.parseInt(args[3]!);

  if (deleteIdx) {
    let data: string[];

    let fileData = fs.readFileSync(todosFilePath).toString();

    data = fileData.split("\n");

    let filteredData = data.filter((value) => value !== "");

    if (deleteIdx > filteredData.length || deleteIdx < 0) {
      console.log("Error: todo #" + deleteIdx + " does not exist. Nothing deleted.");
    } else {
      const deletedItem = filteredData.splice(deleteIdx - filteredData.length, 1);

      const newData = filteredData.join("\n");

      fs.writeFile(todosFilePath, newData, (error) => {
        if (error) throw error;
      });
      console.log(`Deleted todo #${deleteIdx}`);
    }
  } else {
    console.log("Error: Missing NUMBER for deleting todo.");
  }
};

const completeTodo = () => {
  const doneIdx = Number.parseInt(args[3]!);

  if (doneIdx && !isNaN(doneIdx)) {
    let todoData = [];

    const fileData = fs.readFileSync(todosFilePath).toString();
    let doneData = fs.readFileSync(doneFilePath).toString();

    todoData = fileData.split("\n");

    let filteredData = todoData.filter((value) => value !== "");
    if (doneIdx > filteredData.length || doneIdx <= 0) {
      console.log(`Error: todo #${doneIdx} does not exist. Nothing marked completed.`);
    } else {
      const doneItem = filteredData.splice(doneIdx - filteredData.length, 1);

      doneData = doneItem + "\n" + doneData;
      fs.writeFile(doneFilePath, doneData, (error) => {
        if (error) throw error;
      });

      const remaining = filteredData.join("\n");
      fs.writeFile(todosFilePath, remaining, (error) => {
        if (error) throw error;
      });
      console.log(`Marked ${doneItem} as done`);
    }
  } else {
    console.log("Error: Missing Number for setting todo to done.");
  }
};

switch (args[2]) {
  case "add": {
    addTodo();
    break;
  }

  case "ls": {
    listTodos();
    break;
  }

  case "del": {
    deleteTodo();
    break;
  }

  case "done": {
    completeTodo();
    break;
  }

  case "help": {
    todoInfo();
    break;
  }

  //   case "report": {
  //     reportFunction();
  //     break;
  //   }

  default: {
    todoInfo();
    // We will display help when no
    // argument is passed or invalid
    // argument  is passed
  }
}
