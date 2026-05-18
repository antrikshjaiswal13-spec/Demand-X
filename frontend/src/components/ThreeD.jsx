import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const ThreeD = ({ style = {} }) => {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Professional gradient background
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    
    const gradient = ctx.createLinearGradient(0, 0, 512, 512)
    gradient.addColorStop(0, '#000000')
    gradient.addColorStop(0.5, '#031024')
    gradient.addColorStop(1, '#021430')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 512)
    
    const texture = new THREE.CanvasTexture(canvas)
    scene.background = texture

    // Camera
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 8
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create 3D Product Boxes (Buying/Selling)
    const createProductBoxes = () => {
      const objects = []
      const colors = [
        { color: 0x00d9ff, emissive: 0x0099cc, label: 'Buy' },
        { color: 0x10b981, emissive: 0x059669, label: 'Sell' },
        { color: 0xf59e0b, emissive: 0xd97706, label: 'Stock' },
        { color: 0x8b5cf6, emissive: 0x7c3aed, label: 'Predict' }
      ]

      // Create 4 product boxes representing inventory flow
      colors.forEach((colorData, index) => {
        const boxGeom = new THREE.BoxGeometry(0.8, 1.2, 0.8)
        const boxMat = new THREE.MeshPhongMaterial({
          color: colorData.color,
          emissive: colorData.emissive,
          shininess: 100,
          wireframe: false
        })
        const box = new THREE.Mesh(boxGeom, boxMat)
        
        // Position boxes in a circle
        const angle = (index / 4) * Math.PI * 2
        const radius = 3.5
        box.position.x = Math.cos(angle) * radius
        box.position.z = Math.sin(angle) * radius
        box.position.y = Math.sin(Date.now() * 0.0005 + index) * 0.5
        
        scene.add(box)
        objects.push({
          mesh: box,
          speed: 0.008 + index * 0.002,
          rotSpeed: 0.01,
          baseAngle: angle,
          radius: radius,
          oscillation: 0.5,
          color: colorData.color
        })
      })

      // Create center sphere (represents AI/prediction core)
      const coreGeom = new THREE.IcosahedronGeometry(0.6, 5)
      const coreMat = new THREE.MeshPhongMaterial({
        color: 0xff006e,
        emissive: 0xf50058,
        shininess: 150,
        wireframe: false
      })
      const core = new THREE.Mesh(coreGeom, coreMat)
      scene.add(core)
      objects.push({
        mesh: core,
        isCore: true,
        rotSpeed: 0.005,
        glowPulse: true
      })

      return objects
    }

    const objects = createProductBoxes()

    // Lighting - Professional setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00d9ff, 1.5, 150)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x10b981, 1, 150)
    pointLight2.position.set(-10, -10, 10)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0x8b5cf6, 0.8, 150)
    pointLight3.position.set(0, 15, -10)
    scene.add(pointLight3)

    // Add floating particles for enhanced effect
    const particleGeom = new THREE.BufferGeometry()
    const particleCount = 100
    const posArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 20
      posArray[i + 1] = (Math.random() - 0.5) * 20
      posArray[i + 2] = (Math.random() - 0.5) * 20
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00d9ff,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6
    })
    const particles = new THREE.Points(particleGeom, particleMat)
    scene.add(particles)

    let time = 0

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.016

      objects.forEach((obj) => {
        if (obj.isCore) {
          // Core rotates
          obj.mesh.rotation.x += obj.rotSpeed
          obj.mesh.rotation.y += obj.rotSpeed * 0.8
          
          // Pulse effect
          if (obj.glowPulse) {
            const pulse = 1 + Math.sin(time * 2) * 0.2
            obj.mesh.scale.set(pulse, pulse, pulse)
          }
        } else {
          // Product boxes orbit and rotate
          obj.mesh.rotation.x += obj.rotSpeed
          obj.mesh.rotation.y += obj.rotSpeed * 0.6
          obj.mesh.rotation.z += obj.rotSpeed * 0.3

          // Orbital motion
          const newAngle = obj.baseAngle + time * obj.speed
          obj.mesh.position.x = Math.cos(newAngle) * obj.radius
          obj.mesh.position.z = Math.sin(newAngle) * obj.radius
          obj.mesh.position.y = Math.sin(time * 0.8 + obj.baseAngle) * obj.oscillation
        }
      })

      // Animate particles
      particles.rotation.x += 0.0001
      particles.rotation.y += 0.0003

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width
      const newHeight = containerRef.current?.clientHeight || height
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      particleGeom.dispose()
      particleMat.dispose()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', ...style }} />
}

export default ThreeD
