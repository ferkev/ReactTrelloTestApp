const initialData ={
  tasks : {
    'task-1': { id: 'task-1', content: 'Nathalie'},
    'task-2': { id: 'task-2', content: 'Thomas'},
    'task-3': { id: 'task-3', content: 'Marcel'},
    'task-4': { id: 'task-4', content: 'Francis'},
  },



  columns: {
    'column-1':{
      id: 'column-1',
      title: 'To do',
      tasksIds : [ 'task-1', 'task-2', 'task-3', 'task-4' ],
    },
    'column-2':{
      id: 'column-2',
      title: 'In progress',
      tasksIds : [],
    },
    'column-3':{
      id: 'column-3',
      title: 'Done',
      tasksIds : [],
    },
  },
  columnOrder : ['column-1', 'column-2', 'column-3'],
};



export default initialData;