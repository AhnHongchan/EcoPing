'use client'

import MonthlyWalking from "./monthly-walking";
import MonthlyConsumption from "./monthly-consumption";

const MonthlyAnalysis = (): JSX.Element => {
  return (
    <div>
      <MonthlyWalking />
      <MonthlyConsumption />
    </div>
  )
};

export default MonthlyAnalysis;