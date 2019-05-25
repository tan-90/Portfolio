import { IBlogPost } from './IBlogPost';

export class BlogRegistry
{
    private static M_INSTANCE: BlogRegistry;

    private postRegistry: IBlogPost[];

    constructor()
    {
        this.postRegistry = [];
    }

    public static get INSTANCE(): BlogRegistry
    {
        if (!BlogRegistry.M_INSTANCE)
        {
            BlogRegistry.M_INSTANCE = new BlogRegistry();
        }
        return BlogRegistry.M_INSTANCE;
    }

    public registerPost(post: IBlogPost): void
    {
        this.postRegistry.push(post);
    }

    public get posts(): IBlogPost[]
    {
        return this.postRegistry;
    }
}
