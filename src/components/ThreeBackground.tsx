
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
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    
    // Create standard particles
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 15;
      
      let x = Math.cos(angle) * radius;
      let z = Math.sin(angle) * radius;
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
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x0047AB, // Deep blue (USA flag blue)
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create neural network effect (connected nodes)
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const lineIndices: number[] = [];
    
    // Create nodes
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 15;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(x / 3) * Math.cos(z / 3) * 2;
      
      nodes.push(new THREE.Vector3(x, y, z));
    }
    
    // Connect nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      linePositions.push(node.x, node.y, node.z);
      
      // Connect each node to 2-4 closest nodes
      const distances = nodes
        .map((otherNode, idx) => ({ 
          distance: node.distanceTo(otherNode), 
          index: idx 
        }))
        .filter(item => item.index !== i)
        .sort((a, b) => a.distance - b.distance);
      
      const connections = Math.floor(Math.random() * 3) + 2; // 2-4 connections
      for (let j = 0; j < connections && j < distances.length; j++) {
        if (distances[j].distance < 15) {
          lineIndices.push(i, distances[j].index);
        }
      }
    }
    
    lineGeometry.setFromPoints(nodes);
    lineGeometry.setIndex(lineIndices);
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x005EB8,
      transparent: true,
      opacity: 0.4,
      linewidth: 1,
    });
    
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);
    
    // Create holographic tech rings
    const rings: THREE.Mesh[] = [];
    const ringCount = 3;
    
    for (let i = 0; i < ringCount; i++) {
      const ringGeometry = new THREE.TorusGeometry(
        8 + i * 3,  // radius
        0.05,       // tube radius
        16,         // radial segments
        100         // tubular segments
      );
      
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x0047AB : i === 1 ? 0x005EB8 : 0x0073E6,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2; // Make horizontal
      ring.rotation.y = Math.random() * Math.PI;
      rings.push(ring);
      scene.add(ring);
    }
    
    // Create binary data stream particles
    const dataPulseGeometry = new THREE.BufferGeometry();
    const dataPulsePositions = new Float32Array(500 * 3);
    const dataPulseVelocities = new Float32Array(500 * 3);
    
    for (let i = 0; i < dataPulsePositions.length; i += 3) {
      // Random position on a "data stream" spiral line
      const angle = Math.random() * Math.PI * 10;
      const radius = 3 + Math.random() * 2;
      dataPulsePositions[i] = Math.cos(angle) * radius;
      dataPulsePositions[i + 1] = (Math.random() - 0.5) * 20; // Spread vertically
      dataPulsePositions[i + 2] = Math.sin(angle) * radius;
      
      // Velocity for animation
      dataPulseVelocities[i] = (Math.random() - 0.5) * 0.05;
      dataPulseVelocities[i + 1] = (Math.random() - 0.5) * 0.05;
      dataPulseVelocities[i + 2] = (Math.random() - 0.5) * 0.05;
    }
    
    dataPulseGeometry.setAttribute('position', new THREE.BufferAttribute(dataPulsePositions, 3));
    
    // Create data pulse material with custom color
    const dataPulseMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x00FFFF, // Cyan for data pulses
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    
    const dataPulseMesh = new THREE.Points(dataPulseGeometry, dataPulseMaterial);
    scene.add(dataPulseMesh);
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate the network and particles
      particlesMesh.rotation.y = elapsedTime * 0.05;
      lineMesh.rotation.y = elapsedTime * 0.05;
      
      // Animate rings
      rings.forEach((ring, i) => {
        ring.rotation.z = elapsedTime * (0.1 + i * 0.05) % (Math.PI * 2);
        ring.rotation.y = Math.sin(elapsedTime * 0.2) * 0.2 + (i * Math.PI / 6);
        
        // Pulse effect
        const scale = 1 + Math.sin(elapsedTime * 0.5 + i * 0.7) * 0.05;
        ring.scale.set(scale, scale, scale);
      });
      
      // Animate data particles
      const positionAttribute = dataPulseGeometry.attributes.position;
      const positions = positionAttribute.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Update positions with velocity and reset when out of bounds
        positions[i] += dataPulseVelocities[i];
        positions[i + 1] += dataPulseVelocities[i + 1];
        positions[i + 2] += dataPulseVelocities[i + 2];
        
        // Ensure particles stay within bounds or reset them
        const distance = Math.sqrt(
          positions[i] * positions[i] + 
          positions[i + 1] * positions[i + 1] + 
          positions[i + 2] * positions[i + 2]
        );
        
        if (distance > 25 || Math.random() < 0.001) {
          const angle = Math.random() * Math.PI * 10;
          const radius = 3 + Math.random() * 2;
          positions[i] = Math.cos(angle) * radius;
          positions[i + 1] = (Math.random() - 0.5) * 20;
          positions[i + 2] = Math.sin(angle) * radius;
        }
      }
      
      positionAttribute.needsUpdate = true;
      
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
      dataPulseGeometry.dispose();
      dataPulseMaterial.dispose();
      rings.forEach(ring => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
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
