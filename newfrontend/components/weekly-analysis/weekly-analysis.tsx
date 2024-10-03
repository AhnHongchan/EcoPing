'use client'

import WeeklyConsumption from "./weekly-consumption";
import WeeklyWalking from "./weekly-walking";


const WeeklyAnalysis = (): JSX.Element => {
  return (
    <div>
      <WeeklyWalking />
      <WeeklyConsumption />
    </div>
  )
};

export default WeeklyAnalysis;