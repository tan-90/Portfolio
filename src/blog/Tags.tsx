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
};

export { Tags };
