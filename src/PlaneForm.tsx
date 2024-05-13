import * as React from 'react';
import {Button, FormControl, FormLabel, Input} from "@mui/material";
import {Controller, FieldArrayWithId, UseFieldArrayAppend, useForm} from "react-hook-form";
import type {PlaneType, TaskType} from "./types.ts";

type PlaneFormProps = {
  task: TaskType,
  fields: FieldArrayWithId<TaskType, "plane">[],
  append: UseFieldArrayAppend<TaskType, "plane">
}

const PlaneForm: React.FC<PlaneFormProps> = (props: PlaneFormProps): React.ReactElement => {
  const {control, handleSubmit, reset} = useForm<PlaneType>()

  console.log("task", props.task?.plane)
  //{props.task?.plane.map((p:PlaneType) => ({ p.name }))}
  return (
    <div>
      {props.task?.plane?.map(p => (<>Plane:{p.name}:{p.quantity}<br/></>))}
      <div>
        <FormControl>
          <FormLabel htmlFor="name">Plane Name</FormLabel>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({field}) => <Input {...field}/>}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="quantity">Quantity</FormLabel>
          <Controller
            name="quantity"
            control={control}
            defaultValue={0}
            render={({field}) => <Input {...field}/>}
          />
        </FormControl>
        <Button onClick={handleSubmit((data: PlaneType) => {
          console.log("Saving plane", data)
          props.append(data)
          reset()
        })}>Add Plane</Button>
      </div>
    </div>
  );
};

export default PlaneForm;
