import React, {Suspense, useEffect, useState, useRef} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {OrbitControls, Preload, useGLTF, useAnimations} from '@react-three/drei'
import CanvasLoader from '../Loader'


const Computers = ({ isMobile }) => {
  const computer = useGLTF('./smol_pc/scene.gltf')
  const group = useRef();
  const {actions, names, mixer} = useAnimations(computer.animations, group)

  useEffect(() => {
    actions.Animation.play();
  }, [mixer])

  return (
    <mesh ref={group}>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]} 
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        scale={isMobile ? 0.4 : 1.55}
        // scale={isMobile ? 0.5 : 0.75}
        // scale={0.75}
        position={isMobile ? [0, -2, -0.2] : [0, -3.5, -1.5]}
        // position={isMobile ? [0, -2, -0.2] : [0, -3.5, -1.5]}
        // position={[0, -3.5, -1.5]}
        rotation={[0, 0, 0]}
        // rotation={[-0.01, -0.2, -0.1]}
        object={computer.scene}
      />

    </mesh>
  )
}

const ComputersCanvas = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)')

    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])


  return (
    <Canvas
      frameloop="demand"
      shadows
      camera = {{position: [20, 3, 5], fov: 25}}
      gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          autoRotate
          autoRotateSpeed={1.2}
          enableZoom={false}
          maxPolarAngle={Math.PI/2}
          minPolarAngle={Math.PI/2}
        />
        <Computers />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas