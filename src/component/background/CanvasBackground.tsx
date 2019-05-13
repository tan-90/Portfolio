import anime from 'animejs';
import Color from 'color';
import React from 'react';

import { AnimeInstance } from 'animejs';
import { ReactNode } from 'react';
import { RefObject } from 'react';

import { Background } from '../../element/Background';
import { ComponentProvider } from '../../layout/ComponentProvider';
import { ILayoutStyle } from '../../layout/LayoutStyle';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { LayoutComponent } from '../../layout/LayoutComponent';
// import { LayoutRegistry } from '../../layout/LayoutRegistry';
import { Styles } from '../../layout/Styles';

import TriangleCanvasBackground from '../../style/background/TriangleCanvasBackground';
import { Coord } from '../../Types';

interface Point extends Coord
{
    color: Color;
}

export interface ICanvasBackgroundStyle extends ILayoutStyle
{
    type: string;
}

@Styles<ICanvasBackgroundStyle>(
    { name: 'Triangles', data: TriangleCanvasBackground }
)
@ComponentProvider(Background, true)
export class CanvasBackground extends LayoutComponent<IPropsLayoutComponent>
{
    canvasRef: RefObject<HTMLCanvasElement>;
    canvasContext?: CanvasRenderingContext2D | null;

    animationHandle?: number;

    /**
     * The number of triangle columns in the final image.
     */
    columnCount: number;
    /**
     * The number of triangle row in the final image.
     */
    rowCount: number;
    /**
     * Extra horizontal image space added to both sides.
     */
    patternPaddingX: number;
    /**
     * Extra vertical image space added to both sides.
     */
    patternPaddingY: number;
    /**
     * The factor by which the point positions are affected by the random movement.
     */
    positionRandomDampening: number;
    /**
     * The factor by which the colors are affected by the lighten/darken filter.
     */
    colorRandomDampening: number;

    /**
     * Base hue for the generated image.
     */
    hue: number;
    /**
     * Base saturation for the generate image.
     */
    saturation: number;
    /**
     * Lower value bound for the random colors.
     */
    minValue: number;
    /**
     * Upper value bound for the random colors.
     */
    maxValue: number;

    points?: Point[][];

    public constructor(props: IPropsLayoutComponent)
    {
        super(props);

        this.canvasRef = React.createRef();

        const { manager } = this.props;

        this.columnCount = 12;
        this.rowCount = 10;
        this.patternPaddingX = 100;
        this.patternPaddingY = 80;
        this.positionRandomDampening = 0.6;
        this.colorRandomDampening = 0.125;

        this.hue = 360 * Math.random();
        this.saturation = 40;
        this.minValue = 10;
        this.maxValue = 55;

        this.state = {
            activeStyle: manager.getActiveStyle(CanvasBackground.name)
        };

        this.renderCanvas = this.renderCanvas.bind(this);
    }

    public componentDidMount()
    {
        const canvasElement: HTMLCanvasElement | null = this.canvasRef.current;
        if (canvasElement)
        {
            this.canvasContext = canvasElement.getContext('2d');

            if (this.canvasContext)
            {
                const context: CanvasRenderingContext2D = this.canvasContext;
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = 'high';

                this.points = this.getPoints();
                this.renderCanvas();

                /*
                 * This just makes it so the generated image covers the whole window on resize.
                 * It shouldn't be done this way, instead it should regenerate only when certain breakpoints are hit.
                 * It will be fixed in the future.
                 */
                window.addEventListener('resize', event => {
                    if (this.animationHandle)
                    {
                        window.cancelAnimationFrame(this.animationHandle);
                    }

                    this.points = this.getPoints();
                    this.renderCanvas();
                });
            }
        }
    }

    public componentWillUnmount()
    {
        if (this.animationHandle)
        {
            window.cancelAnimationFrame(this.animationHandle);
        }
    }

    private getPoints(): Point[][]
    {
        const points: Point[][] = [];

        const easingTarget: {value: number} = {
            value: this.minValue
        };

        /*
         * animejs is used to create the curve that controls the darkening of the triangles.
         * Any curve can be used and it determines a given value for the color inside the range defined by the class members.
         *
         * I have other uses in mind for animejs, so no, I'm not using a fully fledged animation lib just because I want to evaluate a bezier curve.
         */
        const valueEasing: AnimeInstance = anime({
            targets: easingTarget,
            value: this.maxValue,

            duration: this.rowCount,
            easing: 'cubicBezier(0.55, 0.1, 0.25, 0.99)'
        });

        const windowDimensions = {
            x: window.innerWidth,
            y: window.innerHeight
        };

        const stepSizeX: number = (windowDimensions.x + this.patternPaddingX * 2) / (this.columnCount - 1);
        const stepSizeY: number = (windowDimensions.y + this.patternPaddingY * 2) / (this.rowCount - 1);

        for (let i = 0; i < this.columnCount; ++i)
        {
            points.push([]);
            for (let j = 0; j < this.rowCount; ++j)
            {
                valueEasing.seek(this.rowCount - 1 - j);

                points[i].push({
                    x: -this.patternPaddingX + (i * stepSizeX + ((Math.random() * stepSizeX) - stepSizeX / 2) * this.positionRandomDampening),
                    y: -this.patternPaddingY + (j * stepSizeY + ((Math.random() * stepSizeY) - stepSizeY / 2) * this.positionRandomDampening),

                    /*
                     * Using a fixed saturation and clamping the values to a given range ensures any color will look good.
                     * The idea comes from Google's Blockly giving you control over the hue of new blocks, and making sure they look right by fixing the saturation and value.
                     * The value comes from evaluating the easing curve at the current row index.
                     * A random lighten is used to give variety to the image.
                     */
                    color: new Color(`hsl(${this.hue}, ${this.saturation}%, ${easingTarget.value}%)`).lighten((Math.random() - 0.5) * 2 * this.colorRandomDampening)
                });

            }
        }

        return points;
    }

    /*
     * This is not the ideal solution for a canvas component as it requires code for every style inside this class.
     *
     * The way I'll fix that issue is by making ICanvasBackgroundStyle have a render method definition.
     * That render method should be implemented on the style definition, and called from here, given the reference to the canvas.
     * I just wanted to mess around with triangles, so this will sufice as the refactor won't be too hard to do.
     */
    private renderCanvas(): void
    {
        const windowDimensions = {
            x: window.innerWidth,
            y: window.innerHeight
        };

        if (this.canvasContext && this.points)
        {
            const { manager } = this.props;

            const context: CanvasRenderingContext2D = this.canvasContext;
            context.clearRect(0, 0, windowDimensions.x, windowDimensions.y);

            /*
             * Draw all the triangles.
             */
            for (let i = 0; i < this.columnCount; ++i)
            {
                for (let j = 0; j < this.rowCount; ++j)
                {
                    const point: Point = this.points[i][j];

                    if (i < this.columnCount - 1 && j < this.rowCount - 1)
                    {
                        const nextForward: Point = this.points[i + 1][j];
                        const nextDown: Point = this.points[i][j + 1];

                        context.beginPath();
                        context.moveTo(point.x, point.y);
                        context.lineTo(nextForward.x, nextForward.y);
                        context.lineTo(nextDown.x, nextDown.y);
                        context.lineTo(point.x, point.y);
                        context.fillStyle = point.color.hex();
                        context.fill();
                    }

                    if (i > 0 && j > 0)
                    {
                        const nextBackward: Point = this.points[i - 1][j];
                        const nextUp: Point = this.points[i][j - 1];

                        context.beginPath();
                        context.moveTo(point.x, point.y);
                        context.lineTo(nextBackward.x, nextBackward.y);
                        context.lineTo(nextUp.x, nextUp.y);
                        context.lineTo(point.x, point.y);
                        context.fillStyle = point.color.hex();
                        context.fill();
                    }
                }
            }

            /*
             * Draw the lines on the general cursor area.
             *
             * There is no need for precise point matching, so it sufices to use the step size.
             * This allows for an error that equals the ammount of random movement added to the points.
             */
            const stepSizeX: number = (windowDimensions.x + this.patternPaddingX * 2) / (this.columnCount - 1);
            const stepSizeY: number = (windowDimensions.y + this.patternPaddingY * 2) / (this.rowCount - 1);
            const mouseCoord: Coord = {
                x: Math.floor(manager.mouse.x / stepSizeX) + 1,
                y: Math.floor(manager.mouse.y / stepSizeY) + 1
            };
            const { x, y } = mouseCoord;
            const point: Point = this.points[x][y];

            context.lineWidth = 2;
            context.strokeStyle = point.color.lighten(0.15).alpha(0.001).hex();

            if (x < this.columnCount - 1 && y < this.rowCount - 1)
            {
                const nextForward: Point = this.points[x + 1][y];
                const nextDown: Point = this.points[x][y + 1];

                context.beginPath();

                context.moveTo(point.x, point.y);
                context.lineTo(nextForward.x, nextForward.y);

                if (y > 0)
                {
                    const nextDiagonal: Point = this.points[x + 1][y - 1];
                    context.moveTo(point.x, point.y);
                    context.lineTo(nextDiagonal.x, nextDiagonal.y);
                }

                context.moveTo(point.x, point.y);
                context.lineTo(nextDown.x, nextDown.y);

                context.stroke();
            }

            if (x > 0 && y > 0)
            {
                const nextBackward: Point = this.points[x - 1][y];
                const nextUp: Point = this.points[x][y - 1];

                context.beginPath();

                context.moveTo(point.x, point.y);
                context.lineTo(nextBackward.x, nextBackward.y);

                if (y < this.rowCount - 1)
                {
                    const nextDiagonal: Point = this.points[x - 1][y + 1];

                    context.moveTo(point.x, point.y);
                    context.lineTo(nextDiagonal.x, nextDiagonal.y);
                }

                context.moveTo(point.x, point.y);
                context.lineTo(nextUp.x, nextUp.y);

                context.stroke();
            }

            this.animationHandle = window.requestAnimationFrame(this.renderCanvas);
        }
    }

    public render(): ReactNode
    {
        /*
         * The canvas styling is just a placeholder so I can judge the result.
         */
        return (
            <div style={
                {
                    zIndex: 0,
                    position: 'absolute',
                    opacity: 0.6
                }
            }>
                <canvas
                    ref={this.canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            </div>
        );
    }
}
