# My Portfolio Wesbite - Overview 🚀

This repository contains the open source version of my porfolio website.
Do check it out!

## Instructions 🛠️

I have modified the gsap club plugins with the trial plugins, but with the trial plugin you cannot host it🔴. So for Club plugins, Check out here: https://gsap.com/docs/v3/Installation/

**Techstack** - React, TypeScript, GSAP, ThreeJS, WebGL, HTML, Css, JavaScript

![Protfolio-Preview](https://github.com/user-attachments/assets/3c4557e7-6392-4928-b8a9-7b2476ef4edd)

## License

This project is open source and available under the [MIT License](LICENSE).

## Technical Stack Breakdown

### Core Technologies
1. **React (v18.3.1)**
   - Handles the UI components and state management
   - Used for creating reusable components

2. **Three.js Integration**
   - `@react-three/fiber` - React renderer for Three.js
   - `@react-three/drei` - Useful helpers for React Three Fiber
   - `@react-three/cannon` - Physics engine integration
   - `@react-three/rapier` - Physics and animations
   - Used for creating and managing 3D elements

3. **Animation Libraries**
   - GSAP (GreenSock Animation Platform)
   - Used for smooth animations and transitions

### TypeScript Integration
The project uses TypeScript for type safety. Don't worry if you're not familiar with TypeScript - it's essentially JavaScript with type checking. Key points:
- `.ts` files are TypeScript files
- `.tsx` files are TypeScript files that include React components
- Types help catch errors before running the code

## Component Interactions

### 1. Landing Page Flow
Landing Component
├── Loads 3D Character
├── Initializes Lighting
└── Sets up Mouse Interactions

### 2. Character System
The character system is composed of three main utilities:
- **Animation Utils**: Handles character movements and transitions
- **Mouse Utils**: Manages user interactions with the 3D elements
- **Lighting**: Controls scene lighting and ambiance

## Development Workflow

1. **Local Development**
   ```bash
   npm run dev
   ```
   - Starts development server
   - Enables hot reloading
   - Access site at localhost:5173

2. **Building for Production**
   ```bash
   npm run build
   ```
   - Creates optimized production build
   - Compiles TypeScript
   - Bundles assets

3. **Code Quality**
   ```bash
   npm run lint
   ```
   - Checks code for potential issues
   - Ensures consistent code style

## Key Features

1. **3D Character Integration**
   - Interactive 3D model
   - Responsive to user interactions
   - Custom animations

2. **Custom Styling**
   - Modular CSS structure
   - Custom cursor effects
   - Responsive design

3. **Performance Optimizations**
   - Vite for fast development
   - TypeScript for code reliability
   - Optimized 3D rendering

## Best Practices

1. **Code Organization**
   - Components are modular and reusable
   - Utilities are separated by function
   - Styles are component-specific

2. **Performance**
   - Use of modern build tools (Vite)
   - Efficient 3D rendering practices
   - Optimized asset loading

3. **Maintenance**
   - Clear file structure
   - TypeScript for better code maintenance
   - Linting for code consistency

## Common Issues and Solutions

1. **Performance Issues**
   - Ensure 3D models are optimized
   - Reduce unnecessary re-renders
   - Use proper lighting techniques

2. **Mobile Compatibility**
   - Test on different devices
   - Implement responsive design
   - Optimize 3D performance for mobile

3. **Browser Support**
   - Check WebGL compatibility
   - Test across different browsers
   - Implement fallbacks where necessary

## Additional Resources

- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)