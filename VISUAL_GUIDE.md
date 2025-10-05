# 🎨 Visual Design Guide

## Layout Structure

```
┌─────────────────────────────────────────┐
│         Starfield Background            │
│    ╔═══════════════════════════════╗    │
│    ║   3D Animated Spheres Layer   ║    │
│    ║   (Floating & Rotating)       ║    │
│    ╚═══════════════════════════════╝    │
│                                         │
│    ┌───────────────────────────────┐    │
│    │  Glassmorphic Card            │    │
│    │  ┌─────────────────────────┐  │    │
│    │  │  🎨 NFT Minter          │  │    │
│    │  │  Create your own NFT    │  │    │
│    │  └─────────────────────────┘  │    │
│    │                               │    │
│    │  [Connect Wallet Button]     │    │
│    │                               │    │
│    │  ┌─ NFT Name ─────────────┐  │    │
│    │  │ My Awesome NFT         │  │    │
│    │  └────────────────────────┘  │    │
│    │                               │    │
│    │  ┌─ Symbol ────────────────┐ │    │
│    │  │ MNFT                    │ │    │
│    │  └────────────────────────┘  │    │
│    │                               │    │
│    │  ┌─ Metadata URI ──────────┐ │    │
│    │  │ https://arweave.net/... │ │    │
│    │  └────────────────────────┘  │    │
│    │                               │    │
│    │  [     MINT NFT BUTTON     ] │    │
│    │                               │    │
│    └───────────────────────────────┘    │
│                                         │
│    Floating Gradient Blobs              │
└─────────────────────────────────────────┘
```

## Color Scheme

### Background Layers
1. **Base**: Deep space black (#0a0a0f)
2. **Gradient Orbs**: 
   - Purple (#667eea) at 20% left
   - Violet (#764ba2) at 80% right
   - Cyan (#00bfff) at 40% top
3. **Stars**: White dots with twinkling animation

### Card Design
- **Background**: rgba(20, 20, 30, 0.8) - Semi-transparent dark
- **Border**: rgba(255, 255, 255, 0.1) - Subtle white outline
- **Backdrop Filter**: 20px blur for glassmorphism
- **Shadow**: Multiple layers for depth
  - 0 30px 80px rgba(0, 0, 0, 0.5)
  - 0 0 100px rgba(138, 43, 226, 0.2)

### Typography
- **Title**: 3rem, gradient text (purple to pink)
- **Subtitle**: 1.1rem, rgba(255, 255, 255, 0.7)
- **Labels**: 0.95rem, rgba(255, 255, 255, 0.9)
- **Font**: System fonts for performance

### Interactive Elements

#### Buttons
```css
Normal State:
- Background: Linear gradient (purple to violet)
- Padding: 1.2rem
- Border Radius: 12px
- Shadow: 0 10px 30px rgba(102, 126, 234, 0.3)

Hover State:
- Transform: translateY(-3px)
- Shadow: 0 15px 40px rgba(102, 126, 234, 0.5)
- Shine effect sweeps across
```

#### Input Fields
```css
Normal State:
- Background: rgba(255, 255, 255, 0.05)
- Border: 2px solid rgba(255, 255, 255, 0.1)
- Backdrop blur: 10px

Focus State:
- Border: 2px solid #667eea
- Background: rgba(255, 255, 255, 0.08)
- Glow: 0 0 20px rgba(102, 126, 234, 0.3)
```

## Animation Timeline

### Page Load (0-2s)
```
0.0s: Page appears
0.2s: Title fades in from top
0.4s: Subtitle fades in
0.6s: Wallet button scales in
0.7s: Form field 1 slides in from left
0.8s: Form field 2 slides in from left
0.9s: Form field 3 slides in from left
1.0s: Mint button fades in from bottom
```

### 3D Scene (Continuous)
```
- Spheres: Rotate on X and Y axes
- Particles: Slow rotation around center
- Camera: Auto-rotate at 0.5 speed
- Float effect: 2 second cycle
```

### Background (Continuous)
```
- Stars: 3s twinkle cycle (random delays)
- Gradient blobs: 20s float animation
- Shimmer: 3s sweep across card
```

### Interactions
```
Button Hover: 0.3s ease
Button Press: 0.1s ease
Input Focus: 0.3s ease
Card Hover: Spring animation (stiffness: 300)
Status Message: 0.3s slide in
```

## Responsive Breakpoints

### Desktop (> 1024px)
- Card: 600px max-width
- 3D Scene: Full viewport
- All animations enabled

### Tablet (768px - 1024px)
- Card: 90% width
- 3D Scene: Reduced particle count
- Animations enabled

### Mobile (< 768px)
- Card: 95% width, reduced padding
- 3D Scene: Simplified (fewer particles)
- Reduced animation complexity
- Touch-optimized interactions

## Performance Tips

1. **GPU Acceleration**: All transforms use translate3d
2. **Will-change**: Applied to animated elements
3. **Lazy Loading**: 3D scene loads after main content
4. **Debouncing**: Input handlers debounced
5. **Memoization**: Heavy computations cached

## Accessibility

- **Contrast Ratios**: All text meets WCAG AA standards
- **Focus Indicators**: Visible on all interactive elements
- **Keyboard Navigation**: Full support
- **Screen Readers**: Semantic HTML with ARIA labels
- **Reduced Motion**: Respects prefers-reduced-motion

## Browser-Specific Notes

### Safari
- Backdrop-filter requires -webkit- prefix
- WebGL context may need explicit settings

### Firefox
- Smooth scrolling enabled by default
- Particle rendering optimized

### Chrome/Edge
- Full feature support
- Hardware acceleration enabled
