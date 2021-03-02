import React, { FC, useRef, useEffect } from 'react'
import { Page } from '../../Components/Styled'
import * as THREE from 'three'

const BreakoutClone: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<THREE.Scene>()

  const initScene = () => {
    if (!containerRef.current) {
      return
    }
    console.log(containerRef.current)
    const container = containerRef.current
    const { clientHeight, clientWidth } = container

    sceneRef.current = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(clientWidth, clientHeight)
    containerRef.current.appendChild(renderer.domElement)
  }

  const initCamera = () => {}

  useEffect(() => {
    initScene()
  }, [])

  return <Page ref={containerRef}></Page>
}

export default BreakoutClone
