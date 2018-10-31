import * as THREE from 'three';

/**
 * Manages the rendering and switching of backgrounds.
 * 
 * Takes care of basic threejs initialization and loop stuff so backgrounds don't have to worry about it.
 */
export default class BackgroundManager
{
    /**
     * Takes in the container of the render target canvas.
     */
    constructor(canvasContainer)
    {
        this.renderer = new THREE.WebGLRenderer();
        this.setRendererSize();
        document.getElementById(canvasContainer).appendChild(this.renderer.domElement);


        this.currentBackground = null;
        this.running = false;

        window.addEventListener('resize', () => this.onResize(), false);
    }

    onResize()
    {
        this.setRendererSize();
    }

    setRendererSize()
    {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Sets the current background.
     * Can receive a background object.
     * Makes sure the current background is finished before switching.
     * Initializes the new background.
     */
    setBackground(background)
    {
        if (this.currentBackground)
        {
            this.currentBackground.finish();
        }

        this.currentBackground = background;
        this.currentBackground.init();
    }

    /**
     * Main update/render loop.
     * Can be stopped by calling stop on the manager.
     */
    loop()
    {
        if (this.running)
        {
            requestAnimationFrame(() => this.loop());

            this.currentBackground.update();
            this.currentBackground.render(this.renderer);
        }
    }

    /**
     * Starts the update/render loop.
     */
    start()
    {
        this.running = true;
        this.loop();
    }

    /**
     * Stops the update/render loop.
     */
    stop()
    {
        this.running = false;
    }
}