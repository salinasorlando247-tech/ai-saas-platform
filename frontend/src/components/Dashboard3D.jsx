import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Dashboard3D({ metrics }) {
  const mountRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth/mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Example: create bars for engagement metrics
    metrics.forEach((m,i) => {
      const geometry = new THREE.BoxGeometry(1, m.value, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = i*2;
      scene.add(cube);
    });

    camera.position.z = 10;
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, [metrics]);

  return <div ref={mountRef} className="w-full h-96"></div>;
}
