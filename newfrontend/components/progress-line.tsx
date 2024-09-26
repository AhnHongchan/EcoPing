import React, { useEffect, useState } from 'react';

// 컴포넌트의 Props 타입 정의
interface VisualPart {
  percentage: string;
  color: string;
}

interface ProgressLineProps {
  backgroundColor?: string;
  visualParts?: VisualPart[];
}

// TypeScript로 ProgressLine 컴포넌트 정의
const ProgressLine = ({
  backgroundColor = '#e5e5e5',
  visualParts = [{ percentage: '0%', color: 'white' }],
}: ProgressLineProps) => {
  const [widths, setWidths] = useState<string[]>(
    visualParts.map(() => {
      return '0%';
    })
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(
        visualParts.map((item) => {
          return item.percentage;
        })
      );
    });
  }, [visualParts]);

  return (
    <div
      className="progressVisualFull"
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
          }}
          className="progressVisualPart"
        />
      ))}
    </div>
  );
};

export default ProgressLine;
