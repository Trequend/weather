import { FC, useEffect, useRef, useState } from 'react';
import { useInterval, useScreenSize } from '../../../../hooks';
import { DayWidgetCanvas } from './classes';
import classes from './index.module.css';

export type DayWidgetProps = {
  className?: string;
  sunrise: Date;
  sunset: Date;
  timezone: number;
  weatherIcon: string;
};

export const DayWidget: FC<DayWidgetProps> = ({
  className,
  sunrise,
  sunset,
  timezone,
  weatherIcon,
}) => {
  const date = useInterval(1000);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const screenSize = useScreenSize();
  const [widgetCanvas, setWidgetCanvas] = useState<DayWidgetCanvas | null>(
    null
  );

  useEffect(() => {
    if (canvasRef.current === null) {
      throw new Error('no canvas');
    }

    const canvas = new DayWidgetCanvas(canvasRef.current);
    setWidgetCanvas(canvas);
    return () => {
      canvas.destroy();
    };
  }, []);

  useEffect(() => {
    if (widgetCanvas !== null) {
      widgetCanvas.draw(sunrise, sunset, weatherIcon, timezone);
    }
  }, [sunrise, sunset, weatherIcon, timezone, date, widgetCanvas, screenSize]);

  const rootClassName = className
    ? `${className} ${classes.root}`
    : classes.root;

  return <canvas ref={canvasRef} className={rootClassName} />;
};
