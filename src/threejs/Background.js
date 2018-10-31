import * as THREE from 'three';


/**
 * Defines a website background interface.
 * 
 * Handles scene and camera setup.
 * Is rendered using the BackgroundManager.
 * New subclasses should be added to the BackgroundFactory.
 */
export default class Background
{
    constructor(name)
    {
        this.name = name;
    }

    /**
     * Handles scene, camera, shader and mesh creation.
     * Called every time the background is changed by the manager.
     */
    init() { }

    /**
     * Called every render frame and used to update the background state.
     */
    update() { }

    /**
     * Receives a renderer that can be used to render the background scene.
     * Giving the renderer to the background instead of the other way around makes it more flexible.
     */
    render(renderer) { }

    /**
     * Used for memory cleanup.
     * Called by the manager every time the background becomes inactive.
     */    
    finish() { }
}