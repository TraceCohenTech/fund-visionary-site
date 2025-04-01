
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      60, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 20;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create lights
    const ambientLight = new THREE.AmbientLight(0x202040, 1.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x0047AB, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    // Fill positions array with random 3D coordinates in a shape resembling mountain peaks
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a mountain-like distribution (inspired by Six Point logo)
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 15;
      
      // Base coordinates (flat circular distribution)
      let x = Math.cos(angle) * radius;
      let z = Math.sin(angle) * radius;
      
      // Add height with mountain-like pattern
      let y = Math.sin(x / 3) * Math.cos(z / 3) * 3;
      
      // Create peaks
      const distance = Math.sqrt(x*x + z*z);
      if (distance < 12 && Math.random() > 0.7) {
        y += (12 - distance) * (Math.random() * 0.5 + 0.5);
      }
      
      posArray[i] = x;
      posArray[i + 1] = y;
      posArray[i + 2] = z;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material with custom shader
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x0047AB, // Deep blue (USA flag blue)
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create connected lines (for network effect)
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const lineIndices: number[] = [];
    
    // Create 30 main nodes
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 10;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(x / 3) * Math.cos(z / 3) * 2;
      
      nodes.push(new THREE.Vector3(x, y, z));
    }
    
    // Connect nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      linePositions.push(node.x, node.y, node.z);
      
      // Connect each node to 2-3 closest nodes
      const distances = nodes
        .map((otherNode, idx) => ({ 
          distance: node.distanceTo(otherNode), 
          index: idx 
        }))
        .filter(item => item.index !== i)
        .sort((a, b) => a.distance - b.distance);
      
      const connections = Math.floor(Math.random() * 2) + 1; // 1-2 connections
      for (let j = 0; j < connections && j < distances.length; j++) {
        if (distances[j].distance < 10) { // Only connect if within reasonable distance
          lineIndices.push(i, distances[j].index);
        }
      }
    }
    
    lineGeometry.setFromPoints(nodes);
    lineGeometry.setIndex(lineIndices);
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x005EB8, // Israeli blue
      transparent: true,
      opacity: 0.3,
      linewidth: 1,
    });
    
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate the entire scene slowly
      particlesMesh.rotation.y = elapsedTime * 0.05;
      lineMesh.rotation.y = elapsedTime * 0.05;
      
      // Gentle wave effect
      particlesMesh.position.y = Math.sin(elapsedTime * 0.3) * 0.2;
      lineMesh.position.y = Math.sin(elapsedTime * 0.3) * 0.2;
      
      // Render
      renderer.render(scene, camera);
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary via-secondary to-[#010207]"
    />
  );
};

export default ThreeBackground;
