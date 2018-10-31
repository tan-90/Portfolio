import Parallax from './backgrounds/Parallax';

/**
 * Background factory for easy background instantiation.
 */
export default class BackgroundFactory
{
    parallax()
    {
        return new Parallax();
    }
}