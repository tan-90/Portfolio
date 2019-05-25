import { IBlogPost } from '../IBlogPost';
import { postProvider } from '../PostProvider';
import { Tags } from '../Tags';

const post: IBlogPost = {
    name: 'On using proper text editors from the begining',
    description: 'A nudge in the right direction if you are learning to code.',
    image: './assets/posts/Tetris.jpg',
    url: 'onUsingProperTextEditors',
    tags: [
        Tags.tools,
    ],
};

postProvider(post);
