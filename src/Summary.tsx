import * as React from 'react';
import {PlanType} from "./types.ts";

type SummaryProps = {
  plan: PlanType
}

const Summary: React.FC<SummaryProps> = (props: SummaryProps): JSX.Element => {
  return (
    <div>
      {JSON.stringify(props.plan, undefined, 2)}
    </div>
  );
};

export default Summary;
