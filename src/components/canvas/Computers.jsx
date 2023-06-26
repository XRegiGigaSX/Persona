import React, {Suspense, useEffect, useState} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {OrbitControls, Preload, useGLTF} from '@react-three/drei'
import CanvasLoader from '../Loader'

// function shipAnim() {
//   useFrame(() => {
//     console.log("Hey, I'm executing every frame!")
//   })
//   return (
//     <mesh>
//       <boxGeometry />
//       <meshBasicMaterial color="royalblue" />
//     </mesh>
//   )
// }

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
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
        // scale={isMobile ? 0.5 : 0.75}
        scale={0.75}
        // position={isMobile ? [0, -2, -0.2] : [0, -3.5, -1.5]}
        position={[0, -3.5, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
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

  if(isMobile) return <></>

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera = {{position: [20, 3, 5], fov: 25}}
      gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI/2}
          minPolarAngle={Math.PI/2}
        />
        <Computers />
      </Suspense>

      {/* <Preload all /> */}
    </Canvas>
  )
}

export default ComputersCanvas