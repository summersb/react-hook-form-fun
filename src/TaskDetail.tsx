import * as React from 'react';
import {TaskType} from "./types.ts";

type TaskDetailProps = {
  task: TaskType
}

const TaskDetail: React.FC<TaskDetailProps> = (props: TaskDetailProps): React.ReactElement => {
  return (
    <div>
      Task Name{props.task.name}<br/>
      {props.task?.plane?.map(p => (<div key={p.name}>Plane:{p.name}:{p.quantity}</div>))}
    </div>
  );
};

export default TaskDetail;
