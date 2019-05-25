import { IBlogPost } from '../IBlogPost';
import { postProvider } from '../PostProvider';
import { Tags } from '../Tags';

const post: IBlogPost = {
    name: 'So I want to make a simple website/portfolio thingy',
    description: 'The inner hows and whys of this website.',
    image: './assets/posts/Gears.jpg',
    url: 'letsMakeThisSimpleWebsite',
    tags: [
        Tags.web,
        Tags.typeScript,
    ],
};

postProvider(post);
