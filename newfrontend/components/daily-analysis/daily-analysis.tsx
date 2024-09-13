'use client'

import DailyWalking from "./daily-walking";
import DailyConsumption from "./daily-consumption";

const DailyAnalysis = (): JSX.Element => {
  return (
    <div>
      <DailyWalking />
      <DailyConsumption />
    </div>
  )
};

export default DailyAnalysis;