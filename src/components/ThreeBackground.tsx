
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
    
    // Set up renderer with better visibility settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Enhance lights for better visibility
    const ambientLight = new THREE.AmbientLight(0x404040, 3); // Increased intensity
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x0047AB, 2); // Increased intensity
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create particles with enhanced visibility
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    
    // Create standard particles with more pronounced positions
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 15;
      
      let x = Math.cos(angle) * radius;
      let z = Math.sin(angle) * radius;
      let y = Math.sin(x / 3) * Math.cos(z / 3) * 3;
      
      // Create more pronounced peaks
      const distance = Math.sqrt(x*x + z*z);
      if (distance < 12 && Math.random() > 0.7) {
        y += (12 - distance) * (Math.random() * 0.8 + 0.5);
      }
      
      posArray[i] = x;
      posArray[i + 1] = y;
      posArray[i + 2] = z;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08, // Increased size for visibility
      color: 0x00A5FF, // Brighter blue
      transparent: true,
      opacity: 0.8, // Increased opacity
      sizeAttenuation: true,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create neural network effect with brighter lines
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
      color: 0x00D2FF, // Brighter blue for lines
      transparent: true,
      opacity: 0.6, // Increased opacity
      linewidth: 1,
    });
    
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);
    
    // Create brighter holographic tech rings
    const rings: THREE.Mesh[] = [];
    const ringCount = 3;
    
    for (let i = 0; i < ringCount; i++) {
      const ringGeometry = new THREE.TorusGeometry(
        8 + i * 3,  // radius
        0.1,       // increased tube radius
        16,         // radial segments
        100         // tubular segments
      );
      
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x00D2FF : i === 1 ? 0x4DA6FF : 0x66E0FF, // Brighter colors
        transparent: true,
        opacity: 0.8, // Increased opacity
        side: THREE.DoubleSide,
      });
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2; // Make horizontal
      ring.rotation.y = Math.random() * Math.PI;
      rings.push(ring);
      scene.add(ring);
    }
    
    // Create binary data stream particles with enhanced visibility
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
      
      // Increased velocity for animation
      dataPulseVelocities[i] = (Math.random() - 0.5) * 0.08;
      dataPulseVelocities[i + 1] = (Math.random() - 0.5) * 0.08;
      dataPulseVelocities[i + 2] = (Math.random() - 0.5) * 0.08;
    }
    
    dataPulseGeometry.setAttribute('position', new THREE.BufferAttribute(dataPulsePositions, 3));
    
    // Create data pulse material with brighter color
    const dataPulseMaterial = new THREE.PointsMaterial({
      size: 0.15, // Increased size
      color: 0x2AFFFF, // Brighter cyan
      transparent: true,
      opacity: 0.9, // Increased opacity
      sizeAttenuation: true,
    });
    
    const dataPulseMesh = new THREE.Points(dataPulseGeometry, dataPulseMaterial);
    scene.add(dataPulseMesh);
    
    // Animation with faster movement
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate the network and particles with increased speed
      particlesMesh.rotation.y = elapsedTime * 0.08;
      lineMesh.rotation.y = elapsedTime * 0.08;
      
      // Animate rings with increased speed
      rings.forEach((ring, i) => {
        ring.rotation.z = elapsedTime * (0.15 + i * 0.05) % (Math.PI * 2);
        ring.rotation.y = Math.sin(elapsedTime * 0.3) * 0.2 + (i * Math.PI / 6);
        
        // More pronounced pulse effect
        const scale = 1 + Math.sin(elapsedTime * 0.8 + i * 0.7) * 0.08;
        ring.scale.set(scale, scale, scale);
      });
      
      // Animate data particles with increased speed
      const positionAttribute = dataPulseGeometry.attributes.position;
      const positions = positionAttribute.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Update positions with increased velocity
        positions[i] += dataPulseVelocities[i] * 1.5;
        positions[i + 1] += dataPulseVelocities[i + 1] * 1.5;
        positions[i + 2] += dataPulseVelocities[i + 2] * 1.5;
        
        // Ensure particles stay within bounds or reset them
        const distance = Math.sqrt(
          positions[i] * positions[i] + 
          positions[i + 1] * positions[i + 1] + 
          positions[i + 2] * positions[i + 2]
        );
        
        if (distance > 25 || Math.random() < 0.003) {
          const angle = Math.random() * Math.PI * 10;
          const radius = 3 + Math.random() * 2;
          positions[i] = Math.cos(angle) * radius;
          positions[i + 1] = (Math.random() - 0.5) * 20;
          positions[i + 2] = Math.sin(angle) * radius;
        }
      }
      
      positionAttribute.needsUpdate = true;
      
      // More pronounced wave effect
      particlesMesh.position.y = Math.sin(elapsedTime * 0.4) * 0.3;
      lineMesh.position.y = Math.sin(elapsedTime * 0.4) * 0.3;
      
      // Render
      renderer.render(scene, camera);
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
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
      style={{ overflow: 'hidden' }}
    />
  );
};

export default ThreeBackground;
