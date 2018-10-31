import BackgroundManager from './BackgroundManager';
import BackgroundFactory from './BackgroundFactory';

/**
 * The factory used to easily instantiate backgrounds.
 */
const factory = new BackgroundFactory();

/**
 * Get all the possible backgrounds in a list for easy display.
 */
const backgrounds = [
    factory.parallax()
]

/**
 * Create and start a manager.
 */
const manager = new BackgroundManager('backgroundHolder');
manager.setBackground(backgrounds[0]);
manager.start();