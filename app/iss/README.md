# 🛰️ ISS Tracker - Real-Time 3D Visualization

A sophisticated real-time 3D visualization of the International Space Station orbiting Earth, built with Three.js and React Three Fiber. This component demonstrates advanced orbital mechanics calculations, real-time data fetching, and 3D graphics programming.

## 🌟 Features

- **Real-time ISS Tracking**: Live position updates using TLE (Two-Line Element) data
- **3D Earth Visualization**: High-resolution Earth with realistic textures
- **Orbital Trail**: Visual representation of the ISS's path around Earth
- **Precise Calculations**: SGP4/SDP4 orbital propagation algorithms
- **Interactive Controls**: Orbit, zoom, and pan around the 3D scene
- **Live Data Display**: Real-time coordinates, altitude, and velocity

## 🏗️ Architecture

### Component Structure

```
/iss/
├── page.tsx                 # Main ISS tracker page
├── components/
│   ├── EarthScene.tsx      # Main 3D scene container
│   ├── Earth.tsx           # 3D Earth model component
│   └── Iss.tsx             # ISS model and orbital calculations
└── README.md               # This documentation
```

### Data Flow

```
Celestrak API → TLE API Route → useIssTle Hook → ISS Component → 3D Visualization
```

## 🔄 Data Fetching Pipeline

### 1. **TLE Data Source** (`/api/tle`)

The ISS tracker fetches Two-Line Element (TLE) data from multiple sources with fallback mechanisms:

```typescript
// Primary source: Celestrak API
const CELESTRAK_URL = "https://celestrak.com/NORAD/elements/stations.txt";

// Fallback chain:
// 1. Celestrak API (with 2-hour cache)
// 2. Local file (/public/tle/iss.txt)
// 3. Hardcoded fallback TLE
```

**TLE Data Format:**

```
ISS (ZARYA)
1 25544U 98067A   25248.13333647  .00010878  00000+0  19750-3 0  9999
2 25544  51.6332 270.8228 0004213 301.3502  58.7074 15.50112942527561
```

### 2. **Caching Strategy** (`useIssTle` Hook)

- **LocalStorage Cache**: 12-hour TLE data caching
- **API Revalidation**: 2-hour server-side cache
- **Fallback Chain**: Multiple data sources for reliability

```typescript
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours
const REVALIDATE_SECONDS = 60 * 60 * 2; // 2 hours
```

### 3. **Data Processing**

The hook processes raw TLE data into a `SatRec` object using Satellite.js:

```typescript
// Parse TLE lines and create satellite record
const satrec = satellite.twoline2satrec(line1, line2);
```

## 🧮 Orbital Mechanics Algorithms

### **SGP4/SDP4 Propagation**

The ISS tracker uses the SGP4 (Simplified General Perturbations) and SDP4 (Simplified Deep Space Perturbations) algorithms for precise orbital calculations:

```typescript
// Propagate satellite position for given time
const prop = satellite.propagate(satrec, currentTime);
const positionEci = prop.position; // Earth-Centered Inertial
const velocityEci = prop.velocity;
```

### **Coordinate System Transformations**

#### 1. **ECI to ECF Conversion**

```typescript
// Convert from Earth-Centered Inertial to Earth-Centered Fixed
const gmst = satellite.gstime(currentTime); // Greenwich Mean Sidereal Time
const posEcf = satellite.eciToEcf(positionEci, gmst);
```

#### 2. **Geodetic Coordinates**

```typescript
// Convert to latitude, longitude, altitude
const geo = satellite.eciToGeodetic(positionEci, gmst);
const latDeg = (geo.latitude * 180) / Math.PI;
const lonDeg = (geo.longitude * 180) / Math.PI;
const altKm = geo.height;
```

#### 3. **3D Scene Mapping**

```typescript
// Map ECF coordinates to Three.js scene coordinates
const scale = earthSceneRadius / R_EARTH_KM; // Scale factor
const xThree = posEcf.x * scale;
const yThree = posEcf.z * scale; // Z-up coordinate system
const zThree = -posEcf.y * scale;
```

### **Orbital Trail Calculation**

The component pre-calculates the ISS's orbital path for visualization:

```typescript
// Calculate future positions for trail
const orbitWindowMinutes = 90; // 90 minutes ahead
const orbitSampleSeconds = 15; // 15-second intervals

for (let i = 0; i < samples; i++) {
  const futureTime = new Date(now.getTime() + i * orbitSampleSeconds * 1000);
  const prop = satellite.propagate(satrec, futureTime);
  // Convert and store position for trail rendering
}
```

## 🎮 3D Graphics Implementation

### **Earth Model** (`Earth.tsx`)

- **High-resolution texture**: 4K Earth day texture
- **Geometry**: 64x64 sphere segments for smooth appearance
- **Material**: Phong shading with low shininess for realistic look

```typescript
<mesh ref={meshRef} position={[0, 0, 0]}>
  <sphereGeometry args={[2, 64, 64]} />
  <meshPhongMaterial map={earthTexture} shininess={0.1} />
</mesh>
```

### **ISS Model** (`Iss.tsx`)

- **3D Model**: GLTF format ISS model
- **Real-time positioning**: Updated every frame using `useFrame`
- **Orientation**: Model oriented along velocity vector
- **Scaling**: Properly scaled to scene dimensions

### **Orbital Trail**

- **BufferGeometry**: Efficient rendering of orbital path
- **Dynamic updates**: Trail recalculated every 30 seconds
- **Visual styling**: Blue line with transparency

```typescript
<line>
  <bufferGeometry ref={orbitGeomRef} />
  <lineBasicMaterial color={0x4a90e2} transparent={true} opacity={0.95} />
</line>
```

## ⚡ Performance Optimizations

### **Efficient Updates**

- **Frame-based positioning**: ISS position updated every frame (60 FPS)
- **Trail recalculation**: Orbital path updated every 30 seconds
- **NaN-safe calculations**: Robust error handling for invalid data

### **Memory Management**

- **Pre-allocated buffers**: Fixed-size Float32Array for trail positions
- **Efficient geometry**: BufferGeometry for optimal rendering
- **Cleanup**: Proper interval cleanup on component unmount

### **Data Validation**

```typescript
// Validate calculated positions
if (
  !Number.isFinite(xThree) ||
  !Number.isFinite(yThree) ||
  !Number.isFinite(zThree)
) {
  console.warn("Received invalid ISS position, skipping update");
  return;
}
```

## 🎯 Real-Time Data Display

The UI overlay shows live ISS data:

- **Latitude/Longitude**: Current position coordinates
- **Altitude**: Height above Earth's surface (km)
- **Velocity**: Orbital speed (km/h)
- **Position**: 3D coordinates in ECF system

## 🔧 Configuration Options

### **ISS Component Props**

```typescript
interface IssProps {
  modelUrl?: string;              // GLTF model path
  earthSceneRadius?: number;      // Earth radius in scene units
  orbitWindowMinutes?: number;    // Trail duration (default: 90 min)
  orbitSampleSeconds?: number;    // Trail sample interval (default: 15s)
  setIssInfo: React.Dispatch<...>; // Callback for live data
}
```

### **Scene Configuration**

```typescript
// Camera setup
camera={{ position: [0, 0, 8], fov: 45 }}

// Controls
<OrbitControls
  enableZoom={true}
  enablePan={true}
  enableRotate={true}
  minDistance={3}
  maxDistance={20}
/>
```

## 🚀 Technical Dependencies

- **satellite.js**: Orbital mechanics calculations
- **three.js**: 3D graphics rendering
- **@react-three/fiber**: React Three.js integration
- **@react-three/drei**: Three.js helpers and utilities
- **axios**: HTTP client for API requests

## 🎨 Visual Features

- **Realistic Earth**: High-resolution day texture
- **Space background**: 20,000 animated stars
- **Dynamic lighting**: Ambient and directional lighting
- **Smooth animations**: 60 FPS real-time updates
- **Interactive controls**: Full 3D navigation

## 🔍 Error Handling

The system includes comprehensive error handling:

1. **API Failures**: Graceful fallback to cached/local data
2. **Invalid Calculations**: NaN detection and skipping
3. **Model Loading**: Suspense boundaries for 3D assets
4. **Network Issues**: Retry mechanisms and offline support

## 📊 Data Accuracy

- **TLE Updates**: Fresh data every 2 hours from Celestrak
- **Propagation Accuracy**: SGP4/SDP4 algorithms for precise calculations
- **Coordinate Systems**: Proper ECI/ECF transformations
- **Time Synchronization**: Accurate time-based propagation

This ISS tracker demonstrates advanced web development techniques combining real-time data processing, 3D graphics programming, and orbital mechanics calculations to create an engaging and educational space visualization.
