import { format, startOfDay, endOfDay } from 'date-fns';
import { getIconSrc, getTimezoneTime } from '../../../../../functions';
import { BezierCurveVector2 } from './bezier-curve';
import { Vector2 } from './vector2.class';

const DAY_LENGTH = 86400000;

type DrawContext = {
  top: number;
  horizon: number;
  width: number;
  height: number;
  startDaylight: number;
  endDaylight: number;
  sunrise: Date;
  sunset: Date;
  now: Date;
  timezone: number;
  weatherIcon: string;
};

export class DayWidgetCanvas {
  private readonly context: CanvasRenderingContext2D;

  private readonly image: HTMLImageElement;

  public constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (context) {
      this.context = context;
    } else {
      throw new Error('2d context not supported');
    }

    this.image = new Image();
  }

  public draw(
    sunrise: Date,
    sunset: Date,
    weatherIcon: string,
    timezone: number
  ) {
    this.resize();
    const drawContext = this.createDrawContext(
      sunrise,
      sunset,
      weatherIcon,
      timezone
    );
    this.context.clearRect(0, 0, drawContext.width, drawContext.height);
    this.drawLines(drawContext);
    this.drawSegments(drawContext);
    this.drawIcon(drawContext);
    this.drawText(drawContext);
  }

  private resize() {
    const { canvas } = this.context;
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio;
    const width = Math.round(rect.width * ratio);
    const height = Math.round(rect.height * ratio);
    canvas.width = width;
    canvas.height = height;
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  private createDrawContext(
    sunrise: Date,
    sunset: Date,
    weatherIcon: string,
    timezone: number
  ): DrawContext {
    const { width, height } = this.context.canvas.getBoundingClientRect();
    const startDay = startOfDay(sunrise);

    const top = 35;
    const horizon = height * 0.7;
    const startDaylight =
      ((sunrise.getTime() - startDay.getTime()) / DAY_LENGTH) * width;
    const endDaylight =
      ((sunset.getTime() - startDay.getTime()) / DAY_LENGTH) * width;

    return {
      top,
      horizon,
      width,
      height,
      startDaylight,
      endDaylight,
      sunrise,
      sunset,
      now: getTimezoneTime(new Date(), timezone),
      timezone,
      weatherIcon,
    };
  }

  private drawLines(drawContext: DrawContext) {
    const { top, horizon, width, startDaylight, endDaylight } = drawContext;

    this.drawDashedLine(0, horizon, width, horizon);
    this.drawDashedLine(startDaylight, top, startDaylight, horizon - 2);
    this.drawDashedLine(endDaylight, top, endDaylight, horizon - 2);
  }

  private drawDashedLine(x0: number, y0: number, x1: number, y1: number) {
    this.context.beginPath();
    this.context.setLineDash([3]);
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = '#c4c4c4';
    this.context.stroke();
    this.context.setLineDash([]);
  }

  private drawSegments(drawContext: DrawContext) {
    const { top, horizon, width, height, startDaylight, endDaylight } =
      drawContext;

    this.context.strokeStyle = '#001F70';
    this.context.fillStyle = '#001F70';
    this.drawSegment(0, startDaylight, horizon, height);

    this.context.strokeStyle = '#7cc9f2';
    this.context.fillStyle = '#7cc9f2';
    this.drawSegment(startDaylight, endDaylight, horizon, top);

    this.context.strokeStyle = '#001F70';
    this.context.fillStyle = '#001F70';
    this.drawSegment(endDaylight, width, horizon, height);
  }

  private drawSegment(start: number, end: number, y0: number, y1: number) {
    this.context.beginPath();
    this.context.moveTo(start, y0);
    this.context.quadraticCurveTo((start + end) / 2, y1, end, y0);
    this.context.fill();
    this.context.stroke();
  }

  private drawIcon(drawContext: DrawContext) {
    const {
      sunrise,
      sunset,
      now,
      timezone,
      weatherIcon,
      top,
      horizon,
      width,
      height,
      startDaylight,
      endDaylight,
    } = drawContext;

    const drawImage = () => {
      const startDay = startOfDay(sunrise);
      const endDay = endOfDay(sunrise);

      let position: Vector2;
      if (now.getTime() < sunrise.getTime()) {
        const t =
          (now.getTime() - startDay.getTime()) /
          (sunrise.getTime() - startDay.getTime());
        position = this.computeIconPosition(
          0,
          startDaylight,
          horizon,
          height,
          t
        );
      } else if (now.getTime() < sunset.getTime()) {
        const t =
          (now.getTime() - sunrise.getTime()) /
          (sunset.getTime() - sunrise.getTime());
        position = this.computeIconPosition(
          startDaylight,
          endDaylight,
          horizon,
          top,
          t
        );
      } else {
        const t =
          (now.getTime() - sunset.getTime()) /
          (endDay.getTime() - sunset.getTime());
        position = this.computeIconPosition(
          endDaylight,
          width,
          horizon,
          height,
          t
        );
      }

      this.context.drawImage(
        this.image,
        position.x - 15,
        position.y - 15,
        30,
        30
      );
    };

    const src = getIconSrc(weatherIcon, sunrise, sunset, timezone);
    if (this.image.src.indexOf(src) !== -1) {
      drawImage();
      return;
    }

    this.image.src = src;
    this.image.onload = drawImage;
  }

  private computeIconPosition(
    start: number,
    end: number,
    y0: number,
    y1: number,
    t: number
  ) {
    const curve = new BezierCurveVector2([
      new Vector2(start, y0),
      new Vector2((start + end) / 2, y1),
      new Vector2(end, y0),
    ]);

    return curve.evaluate(t);
  }

  private drawText(drawContext: DrawContext) {
    const { horizon, startDaylight, endDaylight, sunrise, sunset } =
      drawContext;

    this.context.fillStyle = '#c4c4c4';
    this.context.font = 'normal 10px Poppins';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText(
      'Horizon',
      (endDaylight + startDaylight) / 2,
      horizon + 10
    );
    this.context.fillText('Sunrise', startDaylight, 7.5);
    this.context.fillText('Sunset', endDaylight, 7.5);

    this.context.fillStyle = '#9a9a9a';
    this.context.font = 'normal 12px Poppins';
    this.context.fillText(format(sunrise, 'hh:mm aa'), startDaylight, 26);
    this.context.fillText(format(sunset, 'hh:mm aa'), endDaylight, 26);
  }

  public destroy() {
    this.image.remove();
  }
}
