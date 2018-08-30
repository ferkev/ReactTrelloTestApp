import React, { Component } from 'react';
import '@atlaskit/css-reset'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData  from './InitialData';
import styled from 'styled-components';
import Column from './Column';

const Container = styled.div`
    display: flex;
`

export default class Index extends Component {
    state = initialData ;

    onDragEnd = result =>{
        const { destination, source, draggableId, type} = result;
        console.log(result)
        if(!destination){
            return;
        }
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ){
            return;
        }

        console.log(type)
        if(type === 'column'){
            console.log(type)
            const newColumnOrder = this.state.columnOrder
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
        
        
            const newState = {
                ...this.state,
                columnOrder: newColumnOrder,
            };

            this.setState(newState);
            return;
        }
    

        const start = this.state.columns[source.droppableId]; //zone de depart
        const finish = this.state.columns[destination.droppableId]; //zone de fin

        if( start === finish){
            console.log(start)
        let newTaskIds = start.tasksIds;
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        
        const newColumn = {
            ...start,
            taskIds : newTaskIds,
        }

        const newState = {
                ...this.state,
            columnn : {
                ...this.state.columns,
                [newColumn.id]: newColumn,
            },
        };
        this.setState(newState);
        return;
    }

    let startTaskIds = start.tasksIds
    console.log(start.taskIds)
    startTaskIds.splice(source.index, 1);
    //newTaskIds.splice(destination.index, 0, draggableId);
    const newStart = {
        ...start,
        taskIds: startTaskIds,
    }

    
    let finishTaskIds = finish.tasksIds
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
    }
    const newState = {
        ...this.state,
    columnn : {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
    },
};
this.setState(newState);
}


    //onDragStart
    //onDragUpdate
    //onDragEnd

  render() {

    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
                <Container
                {...provided.droppableProps}
                innerRef={provided.innerRef}
                >
                    {this.state.columnOrder.map((columnId, index)=>{
                        const column = this.state.columns[columnId];
                        const tasks = column.tasksIds.map(taskId => this.state.tasks[taskId]);
                        return <Column key={column.id} column={column} tasks={tasks} index={index}/>
                    }
                    )}
                    {provided.placeholder}
                </Container>
            )}
            </Droppable>
        </DragDropContext>
    )
  }
}
