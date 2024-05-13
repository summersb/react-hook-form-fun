import * as React from 'react';
import {Button, FormControl, FormLabel, Input} from "@mui/material";
import {
  Controller,
  FieldArrayWithId,
  UseFieldArrayAppend,
  useForm,
} from "react-hook-form";
import type {PhaseType, PlanType} from "./types"

type PlanProps = {
  fields: FieldArrayWithId<PlanType, "phase">[],
  append: UseFieldArrayAppend<PlanType, "phase">
}

const Phase: React.FC<PlanProps> = (props: PlanProps): React.ReactElement => {
  const {control, handleSubmit, reset} = useForm<PhaseType>()

  return (
    <div>
      {props.fields.map((p: PhaseType) => <div key={p.name}>{p.name}</div>)}
      <FormControl>
        <FormLabel htmlFor="name">Phase Name</FormLabel>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({field}) => <Input {...field}/>}
        />
      </FormControl>
      <Button onClick={handleSubmit((data: PhaseType) => {
        props.append(data)
        reset()
      })}>Add Phase</Button>
    </div>
  );
};

export default Phase;
