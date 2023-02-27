import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks, index }) => {
  return (
    <Droppable key={column.id} droppableId={`drop_${column.id}`} index={index}>
      {(provided) => (
        <Card
          bgColor="lightblue"
          minH="sm"
          h="fit-content"
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...provided.droppableProps}
        >
          <CardHeader p="1rem" pb="0rem">
            <Heading size="md">{column.title}</Heading>
            <Divider mt="1rem" borderWidth="2px" />
          </CardHeader>
          <CardBody p="1rem">
            <VStack>
              {column.tasksId.length > 0 &&
                column.tasksId.map((id, index) => {
                  return (
                    <Task
                      key={id}
                      tasks={tasks}
                      column={column}
                      taskId={id}
                      index={index}
                    />
                  );
                })}
            </VStack>
            {provided.placeholder}
          </CardBody>
        </Card>
      )}
    </Droppable>
  );
};

export default Column;

const Task = ({ tasks, index, taskId }) => {
  return (
    <Draggable key={taskId} draggableId={`drag_${taskId}`} index={index}>
      {(provided) => (
        <Box
          border="1px"
          borderRadius="md"
          w="full"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Text>{tasks[`task${taskId}`].content}</Text>
        </Box>
      )}
    </Draggable>
  );
};
