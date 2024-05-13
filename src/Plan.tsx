import * as React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import {FormControl, FormLabel, Input} from "@mui/material";

const Plan = (): React.ReactElement => {
  const {control} = useFormContext()

  return (
    <div>
      <FormControl>
        <FormLabel htmlFor="name">Plan Name</FormLabel>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({field}) => <Input {...field}/>}
        />
      </FormControl>
    </div>
  );
};

export default Plan;
