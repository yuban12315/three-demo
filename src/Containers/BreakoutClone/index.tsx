import React, { FC, useRef, useEffect, useState } from 'react'
import { Page } from '../../Components/Styled'
import * as THREE from 'three'

const BreakoutClone: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<THREE.Scene>()
  const renderRef = useRef<THREE.WebGLRenderer>()
  const frameIdRef = useRef<number | undefined>()
  const cameraRef = useRef<THREE.Camera>()

  const initScene = () => {
    if (!containerRef.current) {
      return
    }

    const container = containerRef.current
    const { clientHeight, clientWidth } = container

    sceneRef.current = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(clientWidth, clientHeight)
    renderer.setClearColor(new THREE.Color(0xffffff))
    renderRef.current = renderer
    containerRef.current.appendChild(renderer.domElement)
  }

  const initCamera = () => {
    const container = containerRef.current!
    const { clientHeight, clientWidth } = container

    const camera = new THREE.PerspectiveCamera(90, clientWidth / clientHeight, 0.1, 1000)

    camera.position.set(30, 5, 70)
    camera.lookAt(sceneRef.current!.position)

    cameraRef.current = camera
  }

  const initLight = () => {
    const ambientlight = new THREE.AmbientLight(0xffffff)
    sceneRef.current!.add(ambientlight)
  }

  const startRender = () => {
    console.log(frameIdRef.current, !frameIdRef.current)
    if (!frameIdRef.current) {
      frameIdRef.current = requestAnimationFrame(() => {
        renderRef.current?.render(sceneRef.current!, cameraRef.current!)
      })
    }
  }

  useEffect(() => {
    initScene()
    initCamera()
    initLight()

    startRender()
  }, [])

  return <Page ref={containerRef}></Page>
}

export default BreakoutClone
