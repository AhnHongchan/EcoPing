import React, { useEffect, useState } from "react";

interface VisualPart {
  percentage: string;
  color: string;
}

interface ProgressLineProps {
  backgroundColor?: string;
  visualParts?: VisualPart[];
}

const ProgressLine: React.FC<ProgressLineProps> = ({
  backgroundColor = "#e5e5e5",
  visualParts = [
    {
      percentage: "0%",
      color: "white",
    },
  ],
}) => {
  const [widths, setWidths] = useState<string[]>(
    visualParts.map(() => "0%")
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(visualParts.map((item) => item.percentage));
    });
  }, [visualParts]);

  return (
    <div
      className="flex h-2.5 my-5 rounded-full w-64"
      style={{
        backgroundColor,
      }}
    >
      {visualParts.map((item, index) => (
        <div
          key={index}
          style={{
            width: widths[index],
            backgroundColor: item.color,
            transition: "width 2s",
          }}
          className="h-2.5 rounded-full"
        />
      ))}
    </div>
  );
};

export default ProgressLine;
