import { ElementProvider } from '../../layout/ElementProvider';
import { LayoutElement } from '../../layout/LayoutElement';
import { IBlogPost } from '../../blog/IBlogPost';
import { IPropsLayoutElement } from '../../layout/LayoutElement';
import { IPropsLayoutComponent } from '../../layout/LayoutComponent';

import { Tags } from '../../blog/Tags';

export interface IPropsBlogComponent extends IPropsLayoutComponent
{
    posts: IBlogPost[];
}

@ElementProvider()
export class Blog extends LayoutElement
{

    images: string[] = [
        'https://as2.ftcdn.net/jpg/00/52/81/25/500_F_52812501_hf1uP3HGIQ1c9KzwpCvov5YNXM2YLQ5t.jpg',
        'https://as2.ftcdn.net/jpg/01/02/90/93/500_F_102909312_KKFhTp5z8RdCrnhpQRIU8jaGDjQk7vkI.jpg',
        'https://as2.ftcdn.net/jpg/01/03/67/07/500_F_103670706_jW4KvfywuVR2zZM2btKQtjXGLmEMuKrT.jpg',
        'https://as1.ftcdn.net/jpg/00/87/64/36/500_F_87643679_j8TQc8MsRiTOfdQ55ee0H6Nl6SXcBEsk.jpg',
        'https://as2.ftcdn.net/jpg/01/19/86/85/500_F_119868553_aBTTppjjh9UTlVrIFZsCKjzbj2yqavV1.jpg',
        'https://as2.ftcdn.net/jpg/00/64/36/21/500_F_64362179_PtpLvCL9ssLuLddr5LVFQteM0K0OLShb.jpg'
    ];

    i: number = 0;
    posts: IBlogPost[] = [
        {
            name: 'Let me point out a few thigs about pointers',
            description: 'My titles are kinda large for card view aren\'t they?',
            image: this.images[this.i++],
            url: 'pointingOutThingsAboutPointers',
            tags: [
                Tags.c,
            ]
        },
        {
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            description: 'Vestibulum hendrerit est enim, et tristique mi egestas et.',
            image: this.images[this.i++],
            url: 'loremIpsum',
            tags: [
                Tags.cpp,
                Tags.art,
            ]
        },
        {
            name: 'Morbi ullamcorper sed turpis in mattis.',
            description: 'enean lorem sapien, pharetra at dolor quis, vestibulum dictum ex. ',
            image: this.images[this.i++],
            url: 'loremIpsum',
            tags: [
                Tags.visualization,
            ]
        },
        {
            name: 'Nullam sit amet molestie ex, ac mollis erat.',
            description: 'Sed sem purus, consequat sit amet nisi ut, euismod laoreet purus. ',
            image: this.images[this.i++],
            url: 'loremIpsum',
            tags: [
                Tags.cpp,
                Tags.art,
                Tags.visualization,
            ]
        },
        {
            name: 'Vivamus tempus orci sit amet arcu consectetur euismod.',
            description: 'Mauris pharetra, augue at ultricies luctus, nibh sapien sagittis risus, in pretium nisl mauris in diam.',
            image: this.images[this.i++],
            url: 'loremIpsum',
            tags: [
                Tags.art,
                Tags.visualization,
            ]
        },
        {
            name: 'Nam iaculis pretium tortor, quis fringilla orci vehicula at.',
            description: 'Nunc iaculis non turpis et lacinia. In commodo placerat nisi a auctor.',
            image: this.images[this.i++],
            url: 'loremIpsum',
            tags: [
                Tags.cpp,
            ]
        },
    ];

    public constructor(props: IPropsLayoutElement)
    {
        super(props);

        const { manager } = this.props;

        this.state = {
            activeComponent: manager.getActiveComponent(Blog.name)
        };
    }

    public getComponentProps(): IPropsBlogComponent
    {
        return {
            manager: this.props.manager,
            
            posts: this.posts
        };
    }
}
