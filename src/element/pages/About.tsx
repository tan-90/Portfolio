import React from 'react';

import { ReactNode } from 'react';
import { Fragment } from 'react';

import { ElementProvider } from '../../layout/ElementProvider';
import { LayoutElement } from '../../layout/LayoutElement';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';
import { IPropsLayoutElement } from '../../layout/LayoutElement';

export interface IPropsAboutComponent extends IPropsLayoutComponent
{
    content: ReactNode;
}

@ElementProvider()
export class About extends LayoutElement
{
    content: ReactNode;

    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        this.content =
            <Fragment>
                <p>
                    Hello! I am <em>tan(90</em>, the internet version of Vinicius Lambardozzi Nascimento: a computer science graduate and enthusiast of, well, lots ot things.
                </p>

                <h1>Areas</h1>
                <p>
                    At the moment, my primary areas of interest are Computer Science, Computer Grahpics and Game Development, with a bit of 3D modelling on my free time.
                </p>

                <h1>Tools</h1>
                <p>
                    As a programmer, my primary tools for normal development are <em>Visual Studio Code</em> and <em>Visual Studio</em>, Visual Studio Code being the choice for everything but C/C++.
                    I considered switching to <em>emacs</em> for a long time (maybe I still consider it), but ended up settling for a set of small keyboard macros for emacs-like text navigation.
                </p>

                <h1>Production</h1>
                <p>
                    My biggest project is <em>quanta</em> a <em>VHDL</em> processor with a toolkit for teaching processor architecture.
                    But the project that is closest to my heart has to be <em>fracture</em>, a Computer Graphics sandbox engine written in <em>C++</em> with <em>OpenGL</em>.
                </p>
            </Fragment>;

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(About.name)
        };
    }

    public getComponentProps(): IPropsAboutComponent
    {
        return {
            manager: this.props.manager,

            content: this.content
        };
    }
}
