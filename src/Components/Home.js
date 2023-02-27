import React, { useEffect, useState } from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

const Home = () => {
  const [tasks, setTasks] = useState({});
  const [columns, setColumns] = useState([]);

  const initialState = {
    taskList: {
      task1: { id: 1, content: "Create React App" },
      task2: { id: 2, content: "Add required dep packages" },
      task3: { id: 3, content: "Design initial state" },
      task4: { id: 4, content: "Create neccessary componenets" },
      task5: { id: 5, content: "Implement feature" },
      task6: { id: 6, content: "Test and formate code" },
      task7: { id: 7, content: "Code review" },
    },
    columnList: [
      { id: "icebox", title: "Ice box", tasksId: [1, 2, 3, 4, 5, 6, 7] },
      { id: "todo", title: "To do", tasksId: [] },
      { id: "inprogress", title: "In progress", tasksId: [] },
      { id: "ready", title: "Ready", tasksId: [] },
      { id: "complete", title: "Complete", tasksId: [] },
    ],
  };

  useEffect(() => {
    setTasks(initialState.taskList);
    setColumns(initialState.columnList);
  }, []);

  const handleSortEnd = ({ destination, source }) => {
    const sourceColumnId = source.droppableId.split("_")[1];
    const sourceColumnIndex = columns.findIndex(
      (column) => column.id === sourceColumnId
    );
    const sourceColumn = columns[sourceColumnIndex];
    const sourceTaskId = sourceColumn.tasksId[source.index];
    if (destination.droppableId === source.droppableId) {
      sourceColumn.tasksId.splice(source.index, 1);
      sourceColumn.tasksId.splice(destination.index, 0, sourceTaskId);
      setColumns([...columns], (columns[sourceColumnIndex] = sourceColumn));
    } else {
      const destinationColumnId = destination.droppableId.split("_")[1];
      const destinationColumnIndex = columns.findIndex(
        (column) => column.id === destinationColumnId
      );
      const destinationColumn = columns[destinationColumnIndex];
      destinationColumn.tasksId.splice(destination.index, 0, sourceTaskId);
      sourceColumn.tasksId.splice(source.index, 1);
    }
  };

  return (
    <DragDropContext onDragEnd={handleSortEnd}>
      <Heading m="1rem"> Kanban Board </Heading>
      <SimpleGrid columns={[2, 3, 4]} spacing={4}>
        {columns.length > 0 &&
          columns.map((column, index) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                onSortEnd={handleSortEnd}
                index={index}
              />
            );
          })}
      </SimpleGrid>
    </DragDropContext>
  );
};

export default Home;
