export interface ILayoutStyleData
{
    className: string;
}

export class LayoutStyle
{
    private attributes: Map<string, ILayoutStyleData>;
    private mName: string;

    constructor(name: string, attributes: Map<string, ILayoutStyleData>)
    {
        this.attributes = attributes;
        this.mName = name;
    }

    public getAtrribute(name: string): ILayoutStyleData
    {
        const attribute: ILayoutStyleData | undefined = this.attributes.get(name);

        if (!attribute)
        {
            throw new Error(`Attempt to get non-existing attribute ${name}`);
        }

        return attribute;
    }

    public get name(): string
    {
        return this.mName;
    }
}
