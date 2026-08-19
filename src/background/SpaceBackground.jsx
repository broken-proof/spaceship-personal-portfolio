import { useEffect, useRef } from 'react'
import './background.css'
import * as THREE from 'three'

function SpaceBackground() {

  //Target <three_canvas> using reference
  const threeCanvasRef = useRef(null);

  //useEffect hook for Three.js processes running in bg
  useEffect(() => {
    //Exit if there's issue with canvas object
    if (!threeCanvasRef.current) return

    //SETUP STUFFS FOR THREEJS
    const distance = 50;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = distance;


    const renderer = new THREE.WebGLRenderer({
      canvas: threeCanvasRef.current,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);


    //MAKE STARS

    // //testcanvas
    // const geo = new THREE.BoxGeometry(2, 2, 1);
    // const mat = new THREE.MeshBasicMaterial({ color: 0x00af88 });
    // const cube = new THREE.Mesh(geo, mat);
    // scene.add(cube);


    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = -150 + (Math.random() - 0.5) * 200;
    }

    //Adding stars to scene
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.07,
      color: 0xe4c9f5,
      transparent: true,
      sizeAttenuation: true
    })
    const universe = new THREE.Points(starGeo, starMat);
    scene.add(universe);

    //Modification Variables
    const acceleration = 0.4;

    //Add fog for better zoom in effect
    scene.background = new THREE.Color('#0a0a16');
    scene.fog = new THREE.FogExp2('#0a0a16', 0.02);

    //ANIMATION LOOP
    let frameId;

    const animate = () => {
      //initialize local positions array
      const positions = starGeo.attributes.position.array;

      for (let i = 0; i < count * 3; i += 3) {
        //first move stars towards camera (z-axis)
        positions[i + 2] += acceleration;

        //If star moves past camera, reset
        if (positions[i + 2] > distance) {

          //Reset to random location in range to avoid block-like visual
          positions[i + 2] = -100 - Math.random() * 50;

          //randomize x,y again during reset
          positions[i] = (Math.random() - 0.5) * 50;
          positions[i + 1] = (Math.random() - 0.5) * 50;
        }
      }

      //animate next frame then call function again recursively
      starGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
      //rotate camera for space spinnning effect
      camera.rotation.z = camera.rotation.z += 0.0015;;
    }

    animate();

    //ADD resizing modifications later

    return () => {
      //exit stuff for unmounting
    }
  },
    [])

  return (
    <div className="background_div">
      <canvas className="three_canvas" ref={threeCanvasRef}>

      </canvas>
    </div>
  )
}

export default SpaceBackground;