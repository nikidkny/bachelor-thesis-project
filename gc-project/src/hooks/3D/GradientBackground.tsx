// This component is based on Good City's 3D gradient background implementation.
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface GradientBackgroundProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function GradientBackground({
  color1 = "#EAFFB4",
  color2 = "#EBEAE8",
  color3 = "#B3B3B3",
}: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const backgroundRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      // field of view
      50,
      // aspect ratio
      window.innerWidth / window.innerHeight,
      // near clipping plane
      1,
      // far clipping plane
      1000,
    );
    camera.position.set(0, 0, 2);
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      // alpha is true to allow transparency
      alpha: true,
      // antialiasing for smoother edges
      antialias: true,
      // canvas to render to
      canvas: canvasRef.current,
      // power preference for better performance
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // black background
    renderer.setClearColor(0x000000, 1); 
    
    rendererRef.current = renderer;

    // Create gradient background
    const sphereGeometry = new THREE.SphereGeometry(1.52, 32, 16);
    // Invert the sphere to view from inside
    sphereGeometry.scale(-1, 1, 1);
    // create bounding box
    sphereGeometry.computeBoundingBox();

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(color1) },
        color2: { value: new THREE.Color(color2) },
        color3: { value: new THREE.Color(color3) },
        // hidden by default
        opacity: { value: 0.0 },
        bboxMin: { value: sphereGeometry.boundingBox!.min },
        bboxMax: { value: sphereGeometry.boundingBox!.max },
      },
      vertexShader: `
        uniform vec3 bboxMin;
        uniform vec3 bboxMax;

        varying vec2 vUv;
        
        void main() {
        vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float opacity;

        varying vec2 vUv;
        
        void main() {
        gl_FragColor = vec4(mix(mix(color1, color2, vUv.y), mix(color2, color3, vUv.y), vUv.y), 1.0);
        gl_FragColor.a = opacity;
        }
        `,
    });
    const background = new THREE.Mesh(sphereGeometry, material);
    background.position.set(0, 0, 0);
    backgroundRef.current = background;
    scene.add(background);

    background.material.uniforms.opacity.value = 1.0;

    //Update background scale based on window ratio
    function updateBackgroundScale() {
      const windowRatio = window.innerWidth / window.innerHeight;
      const scaleValue = 1 + windowRatio / 4;

      if (windowRatio > 2.15) {
        background.scale.set(scaleValue, scaleValue, scaleValue);
      } else {
        background.scale.set(1, 1, 1);
      }
    }
    updateBackgroundScale();

    //Animation loop
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    //Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateBackgroundScale();
    };
    window.addEventListener("resize", handleResize);

    //Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      sphereGeometry.dispose();
      material.dispose();
    };
  }, [color1, color2, color3]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ width: "100vw", height: "100vh", zIndex: -9999 }}
    />
  );
}
