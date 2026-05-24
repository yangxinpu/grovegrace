import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface LeafPoint {
  theta: number
  phi: number
  size: number
  rotation: number
  color: string
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const W = rect.width
    const H = rect.height
    const cx = W / 2
    const cy = H / 2
    const R = Math.min(W, H) * 0.25

    const isDark = document.documentElement.classList.contains('dark')
    const leafColors = isDark
      ? ['rgba(15,217,166,0.85)', 'rgba(59,162,254,0.75)', 'rgba(15,217,166,0.65)', 'rgba(43,138,224,0.6)', 'rgba(25,250,198,0.7)']
      : ['rgba(15,217,166,0.9)', 'rgba(43,138,224,0.8)', 'rgba(15,217,166,0.7)', 'rgba(43,138,224,0.65)', 'rgba(25,250,198,0.75)']

    const LEAF_COUNT = 200
    const leaves: LeafPoint[] = []

    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < LEAF_COUNT; i++) {
      const y = 1 - (i / (LEAF_COUNT - 1)) * 2
      const theta = goldenAngle * i
      leaves.push({
        theta,
        phi: Math.acos(y),
        size: 3 + Math.random() * 3,
        rotation: Math.random() * Math.PI * 2,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
      })
    }

    let animId: number
    let angleY = 0
    let angleX = 0.3
    let velocityY = 0.003
    let velocityX = 0
    let isDragging = false
    let lastX = 0
    let lastY = 0
    let idleTime = 0

    function onPointerDown(e: PointerEvent) {
      isDragging = true
      idleTime = 0
      lastX = e.clientX
      lastY = e.clientY
      canvas.style.cursor = 'grabbing'
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      velocityY = dx * 0.005
      velocityX = dy * 0.005
      angleY += velocityY
      angleX += velocityX
      lastX = e.clientX
      lastY = e.clientY
    }

    function onPointerUp() {
      isDragging = false
      canvas.style.cursor = 'grab'
    }

    canvas.style.cursor = 'grab'
    canvas.style.touchAction = 'none'
    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    function project(theta: number, phi: number, rotY: number, rotX: number) {
      const x0 = Math.sin(phi) * Math.cos(theta)
      const y0 = Math.cos(phi)
      const z0 = Math.sin(phi) * Math.sin(theta)

      const x1 = x0 * Math.cos(rotY) - z0 * Math.sin(rotY)
      const z1 = x0 * Math.sin(rotY) + z0 * Math.cos(rotY)
      const y1 = y0 * Math.cos(rotX) - z1 * Math.sin(rotX)
      const z2 = y0 * Math.sin(rotX) + z1 * Math.cos(rotX)

      const perspective = 3
      const scale = perspective / (perspective + z2)

      return {
        sx: cx + x1 * R * scale,
        sy: cy + y1 * R * scale,
        z: z2,
        scale,
      }
    }

    function drawLeaf(px: number, py: number, size: number, angle: number, color: string, alpha: number) {
      ctx.save()
      ctx.translate(px, py)
      ctx.rotate(angle)
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.6, size * 0.5, 0, size)
      ctx.bezierCurveTo(-size * 0.6, size * 0.5, -size * 0.8, -size * 0.5, 0, -size)
      ctx.fill()
      ctx.restore()
    }

    function animate() {
      ctx.clearRect(0, 0, W, H)

      if (!isDragging) {
        idleTime++
        if (idleTime > 60) {
          velocityY += (0.003 - velocityY) * 0.02
          velocityX *= 0.95
        }
        velocityY *= 0.98
        velocityX *= 0.98
        angleY += velocityY
        angleX += velocityX
      }

      const projected = leaves.map((leaf) => {
        const p = project(leaf.theta, leaf.phi, angleY, angleX)
        return { ...leaf, ...p }
      })

      projected.sort((a, b) => a.z - b.z)

      projected.forEach((leaf) => {
        const depthAlpha = 0.3 + (leaf.z + 1) * 0.35
        const depthSize = leaf.size * leaf.scale
        drawLeaf(leaf.sx, leaf.sy, depthSize, leaf.rotation + angleY * 0.5, leaf.color, depthAlpha)
      })

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  return (
    <section className="h-full flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
              人文故事<br />与创意
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              一个阅读、创作，以及深化理解的地方
            </p>
            <div className="flex gap-3 pt-2 pl-20">
              <Link to="/articles" className="px-5 py-1.5 rounded-md font-medium text-sm bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg">
                阅读文章
              </Link>
              <Link to="/quotes" className="px-5 py-1.5 rounded-md font-medium text-sm border border-primary/30 text-primary transition-all duration-200 hover:bg-primary/10 hover:shadow-lg">
                阅读名言
              </Link>
            </div>
          </div>

          <div className="relative aspect-square max-w-lg mx-auto md:max-w-none">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
