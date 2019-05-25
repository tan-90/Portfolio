import TagColors from '../style/pages/blog/TagColors.scss';

export class Tag
{
    name: string;
    filter: string;
    color: string;

    constructor(name: string, color: string, filter?: string)
    {
        this.name = name;
        this.filter = filter ? filter : name.toLocaleLowerCase();
        this.color = color;
    }
}

export type TagList = {[key: string]: Tag};

const Tags: TagList = {
    c: new Tag('C', TagColors.one),
    cpp: new Tag('C++', TagColors.two, 'cpp'),
    art: new Tag('Art', TagColors.three),
    visualization: new Tag('Visualization', TagColors.four),
    comingSoon: new Tag('Coming soon', TagColors.five),
    web: new Tag('Web', TagColors.one),
    typeScript: new Tag('TypeScript', TagColors.two),
    tools: new Tag('Tools', TagColors.three),
};

export { Tags };
