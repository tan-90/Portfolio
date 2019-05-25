import { BlogRegistry } from './BlogRegistry';
import { IBlogPost } from './IBlogPost';
import { Tags } from './Tags';
/*
 * Sadly decorators can't be used on variable declarations.
 * This has to be used as a function.
 */
export function postProvider(target: IBlogPost)
{
    if (!target.post)
    {
        target.tags.push(Tags.comingSoon);
    }
    BlogRegistry.INSTANCE.registerPost(target);
}
