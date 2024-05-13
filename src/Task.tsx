import * as React from 'react';
import {
  Controller,
  FieldArrayWithId,
  useFieldArray, UseFieldArrayReplace,
  useForm
} from "react-hook-form";
import type {PhaseType, PlanType, TaskType} from "./types.ts";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import PlaneForm from "./PlaneForm.tsx";
import TaskDetail from "./TaskDetail.tsx";

type TaskProps = {
  fields: FieldArrayWithId<PlanType, "phase">[],
  replace: UseFieldArrayReplace<PlanType, "phase">
}

const Task: React.FC<TaskProps> = (props: TaskProps): React.ReactElement => {
  const [phase, setPhase] = React.useState<PhaseType | null>()
  const {getValues, control, handleSubmit, reset} = useForm<TaskType>()
  const {fields, append} = useFieldArray({
    control,
    name: "plane"
  })

  const handleChange = (e: SelectChangeEvent<string>) => {
    const phaseName = e.target.value as string
    const foundPhase = props.fields.find(p => p.name === phaseName) ?? null
    setPhase(foundPhase)
  }

  return (
    <div>
      Select a phase
      <Select value={phase?.name ?? ''} onChange={handleChange}>
        {props.fields.map(phase => (
          <MenuItem key={phase.id} value={phase.name}>
            {phase.name}
          </MenuItem>
        ))}
      </Select>
      <br/>
      {phase?.task && phase.task.map((task) => (
        <>
          <TaskDetail key={task.name} task={task}/>
        </>
      ))}
      {phase && (
        <>
          <FormControl>
            <FormLabel htmlFor="name">Task Name</FormLabel>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({field}) => <Input {...field}/>}
            />
          </FormControl>
          <PlaneForm task={getValues()} fields={fields} append={append}/>
        </>
      )}
      <Button onClick={handleSubmit((data: TaskType) => {
        if (phase && !phase?.task) {
          phase.task = []
        }
        phase?.task.push(data)
        props.replace(phase as PhaseType)
        reset()
      })}>Add Task</Button>
    </div>
  );
};

export default Task;
