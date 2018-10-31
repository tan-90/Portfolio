import * as THREE from 'three';

import Background from '../Background';

/**
 * Everything here is a placeholder.
 */
export default class Parallax extends Background
{
    constructor()
    {
        super('Parallax');
    }

    init()
    {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 10;

        let vFOV = THREE.Math.degToRad(this.camera.fov);
        let height = 2 * Math.tan(vFOV / 2) * this.camera.position.z;
        let width = height * this.camera.aspect;
        
        
        let texture = new THREE.TextureLoader().load('assets/bg.png');
        let geometry = new THREE.PlaneGeometry(width, height);
        let material = new THREE.MeshBasicMaterial({ map: texture });

        this.plane = new THREE.Mesh(geometry, material);
        this.plane.matrixWorld.setPosition(new THREE.Vector3(0, 0, 0))

        this.scene.add(this.plane);
    }

    update()
    {

    }

    render(renderer)
    {
        renderer.render(this.scene,  this.camera);
    }

    finish()
    {
        delete  this.scene;
        delete this.camera;
    }
}