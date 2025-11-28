import './App.css'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { LenisRef } from 'lenis/react'
import { ReactLenis } from 'lenis/react'
import {frame, cancelFrame} from 'framer-motion'

function App() {

  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(data: {timestamp: number }) {
      const time = data.timestamp 
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  })
  
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 4])

  return (
    <div className="main">
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}/>
      <div ref={container} className="container">
        <div className="sticky">
          <h1>Sticky Header</h1>
          <motion.div style={{scale}} className="el">
            <div className="image-container">
              <img src="me.jpg" alt="image" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default App
