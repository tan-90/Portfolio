import { IBlogPost } from '../IBlogPost';
import { postProvider } from '../PostProvider';
import { Tags } from '../Tags';

const post: IBlogPost = {
    name: 'Let me point out a few things about pointers',
    description: 'In which I give a quick overview of how pointers work.',
    image: './assets/posts/Binary.jpg',
    url: 'pointingOutThingsAboutPointers',
    tags: [
        Tags.c,
    ],
};

postProvider(post);
