import './App.css'
import React from "react";
import {Box, Button, Step, StepLabel, Stepper, Typography} from "@mui/material";
import Plan from "./Plan.tsx";
import Phase from "./Phase.tsx";
import Task from "./Task.tsx";
import type {PlanType} from './types'
import {FormProvider, useFieldArray, useForm, useWatch} from "react-hook-form";

const steps = ['Create Plan', 'Create Phases', 'Create Tasks'];

function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  const methods = useForm<PlanType>()
  const {fields, append, replace} = useFieldArray({
    control: methods.control,
    name: "phase"
  })

  const w = useWatch({control: methods.control, name: "name"})
  console.log("plan", w, JSON.stringify(methods.getValues(), undefined, 2))

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    methods.handleSubmit(onSubmit)()
  };

  const handleBack = () => {
    if (activeStep === 0) {
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data: PlanType) => {
    console.log("Submit", data)
  }

  return (
    <>
      <Box sx={{width: '100%'}}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {activeStep === 0 && <Plan/>}
            {activeStep === 1 && <Phase fields={fields} append={append}/>}
            {activeStep === 2 && <Task fields={fields} replace={replace}/>}
          </form>
        </FormProvider>
        <React.Fragment>
          <Typography sx={{mt: 2, mb: 1}}>Step {activeStep + 1}</Typography>
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{mr: 1}}
            >
              Back
            </Button>
            <Box sx={{flex: '1 1 auto'}}/>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
        {JSON.stringify(methods.getValues(), undefined, 2)}
      </Box>
    </>
  )
}

export default App
