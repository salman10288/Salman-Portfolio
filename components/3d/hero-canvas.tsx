"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import type { IconType } from "react-icons";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  ContactShadows,
  Float,
  Html,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import {
  SiAngular,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import * as THREE from "three";
import type { Group } from "three";

import { useMediaQuery } from "@/hooks/use-media-query";

interface HeroCanvasProps {
  reducedMotion?: boolean;
  active?: boolean;
  onReady?: () => void;
}

interface TechOrbProps {
  icon: IconType;
  label: string;
  color: string;
  position: [number, number, number];
  scale?: number;
  speed?: number;
}

function SceneReady({ onReady }: { onReady?: () => void }) {
  const notified = useRef(false);

  useFrame(() => {
    if (notified.current) return;
    notified.current = true;
    window.requestAnimationFrame(() => onReady?.());
  });

  return null;
}

function TechOrb({ icon: Icon, label, color, position, scale = 1, speed = 1.5 }: TechOrbProps) {
  return (
    <Float speed={speed} rotationIntensity={0.55} floatIntensity={0.8} position={position}>
      <group scale={scale}>
        <mesh castShadow>
          <sphereGeometry args={[0.36, 32, 32]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.22}
            metalness={0.1}
            roughness={0.18}
            transmission={0.16}
            thickness={0.8}
            transparent
            opacity={0.76}
          />
        </mesh>
        <mesh scale={1.08}>
          <sphereGeometry args={[0.36, 24, 24]} />
          <meshBasicMaterial color={color} transparent opacity={0.075} side={THREE.BackSide} />
        </mesh>
        <Html transform center distanceFactor={5.5} zIndexRange={[7, 1]} style={{ pointerEvents: "none" }}>
          <div className="tech-orb-label" style={{ color }}>
            <Icon size={25} color={color} />
            <span>{label}</span>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function LaptopCode() {
  return (
    <div className="laptop-screen" aria-hidden="true">
      <div className="laptop-screen__bar">
        <span />
        <span />
        <span />
        <strong>portfolio.tsx</strong>
      </div>
      <div className="laptop-screen__code">
        <p><i>01</i><b className="code-violet">const</b> <b className="code-cyan">developer</b> = &#123;</p>
        <p><i>02</i>&nbsp;&nbsp;name: <b className="code-green">&quot;Salman Saeed&quot;</b>,</p>
        <p><i>03</i>&nbsp;&nbsp;craft: <b className="code-green">&quot;digital experiences&quot;</b>,</p>
        <p><i>04</i>&nbsp;&nbsp;focus: [<b className="code-green">&quot;quality&quot;</b>, <b className="code-green">&quot;motion&quot;</b>],</p>
        <p><i>05</i>&nbsp;&nbsp;available: <b className="code-orange">true</b>,</p>
        <p><i>06</i>&#125;;</p>
        <p className="code-cursor"><i>07</i><span /></p>
      </div>
    </div>
  );
}

function Laptop() {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.025 - 0.08;
  });

  const keys = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        x: (index % 7) * 0.185 - 0.555,
        z: Math.floor(index / 7) * 0.14 - 0.24,
      })),
    [],
  );

  return (
    <group ref={group} position={[0, 0.15, 0.05]} rotation={[0, -0.08, 0]}>
      <RoundedBox args={[1.82, 0.1, 1.14]} radius={0.06} smoothness={4} castShadow>
        <meshStandardMaterial color="#111820" metalness={0.62} roughness={0.28} />
      </RoundedBox>
      <RoundedBox
        args={[1.68, 1.1, 0.08]}
        radius={0.055}
        smoothness={4}
        position={[0, 0.61, -0.52]}
        rotation={[-0.09, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color="#0a0e13" metalness={0.65} roughness={0.22} />
      </RoundedBox>
      <mesh position={[0, 0.61, -0.468]} rotation={[-0.09, 0, 0]}>
        <planeGeometry args={[1.52, 0.93]} />
        <meshBasicMaterial color="#06141b" toneMapped={false} />
      </mesh>
      <Html
        transform
        center
        position={[0, 0.61, -0.447]}
        rotation={[-0.09, 0, 0]}
        distanceFactor={1.55}
        zIndexRange={[9, 1]}
        style={{ pointerEvents: "none" }}
      >
        <LaptopCode />
      </Html>
      {keys.map((key, index) => (
        <mesh key={index} position={[key.x, 0.07, key.z + 0.08]} castShadow>
          <boxGeometry args={[0.145, 0.018, 0.095]} />
          <meshStandardMaterial color="#242d37" metalness={0.32} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 0.066, 0.4]}>
        <boxGeometry args={[0.52, 0.012, 0.28]} />
        <meshStandardMaterial color="#161e26" metalness={0.5} roughness={0.35} />
      </mesh>
    </group>
  );
}

function Workspace({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current || reducedMotion) return;
    const targetRotation = Math.sin(clock.elapsedTime * 0.18) * 0.035;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotation,
      Math.min(delta * 2, 1),
    );
    group.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.025 - 0.1;
  });

  return (
    <group ref={group} position={[0.35, -0.1, 0]} rotation={[0, -0.03, 0]}>
      <RoundedBox args={[3.65, 0.18, 1.72]} radius={0.09} smoothness={5} position={[0, -0.76, 0]} receiveShadow castShadow>
        <meshStandardMaterial color="#111820" roughness={0.34} metalness={0.5} />
      </RoundedBox>
      <mesh position={[-1.52, -1.45, 0.57]} castShadow>
        <boxGeometry args={[0.12, 1.42, 0.12]} />
        <meshStandardMaterial color="#0d1319" metalness={0.72} roughness={0.26} />
      </mesh>
      <mesh position={[1.52, -1.45, 0.57]} castShadow>
        <boxGeometry args={[0.12, 1.42, 0.12]} />
        <meshStandardMaterial color="#0d1319" metalness={0.72} roughness={0.26} />
      </mesh>
      <mesh position={[-1.52, -1.45, -0.57]} castShadow>
        <boxGeometry args={[0.12, 1.42, 0.12]} />
        <meshStandardMaterial color="#0d1319" metalness={0.72} roughness={0.26} />
      </mesh>
      <mesh position={[1.52, -1.45, -0.57]} castShadow>
        <boxGeometry args={[0.12, 1.42, 0.12]} />
        <meshStandardMaterial color="#0d1319" metalness={0.72} roughness={0.26} />
      </mesh>
      <Laptop />
      <mesh position={[-1.35, -0.6, 0.15]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.34, 32]} />
        <meshStandardMaterial color="#101820" roughness={0.42} metalness={0.5} />
      </mesh>
      <mesh position={[-1.35, -0.39, 0.15]}>
        <torusGeometry args={[0.18, 0.028, 12, 32]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} />
      </mesh>
      <TechOrb icon={SiReact} label="React" color="#61dafb" position={[-2.15, 1.24, 0.15]} scale={0.92} />
      <TechOrb icon={SiAngular} label="Angular" color="#ff3e55" position={[2.2, 1.52, -0.15]} scale={0.88} speed={1.35} />
      <TechOrb icon={SiNextdotjs} label="Next.js" color="#f8fafc" position={[-1.82, 2.25, -0.65]} scale={0.78} speed={1.75} />
      <TechOrb icon={SiNodedotjs} label="Node" color="#84cc16" position={[1.8, 2.45, -0.9]} scale={0.8} speed={1.45} />
      <TechOrb icon={SiMongodb} label="MongoDB" color="#00ed64" position={[2.52, 0.35, 0.48]} scale={0.72} speed={1.6} />
      <TechOrb icon={SiTypescript} label="TypeScript" color="#38bdf8" position={[-2.48, 0.28, -0.38]} scale={0.74} speed={1.7} />
    </group>
  );
}

function GroundGrid() {
  const grid = useMemo(() => {
    const helper = new THREE.GridHelper(22, 44, "#00e5ff", "#16202a");
    const materials = Array.isArray(helper.material) ? helper.material : [helper.material];
    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.14;
      material.depthWrite = false;
    });
    return helper;
  }, []);

  useEffect(
    () => () => {
      grid.geometry.dispose();
      const materials = Array.isArray(grid.material) ? grid.material : [grid.material];
      materials.forEach((material) => material.dispose());
    },
    [grid],
  );

  return <primitive object={grid} position={[0, -2.18, 0]} />;
}

function LightBeam({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  return (
    <mesh position={position} rotation={rotation} renderOrder={-1}>
      <coneGeometry args={[0.9, 5.5, 32, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.035}
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, pointer } = useThree();
  const lookTarget = useMemo(() => new THREE.Vector3(0.15, 0.05, 0), []);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const alpha = 1 - Math.exp(-delta * 2.4);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.48, alpha);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.12 + pointer.y * 0.22, alpha);
    camera.lookAt(lookTarget);
  });

  return null;
}

function Scene({ reducedMotion, compact, onReady }: { reducedMotion: boolean; compact: boolean; onReady?: () => void }) {
  return (
    <>
      <fog attach="fog" args={["#05070a", 6.8, 13]} />
      <ambientLight intensity={0.34} />
      <hemisphereLight args={["#a5f3fc", "#020305", 0.48]} />
      <spotLight
        position={[-4.5, 7, 4]}
        angle={0.34}
        penumbra={0.9}
        intensity={42}
        color="#00e5ff"
        castShadow={!compact}
        shadow-mapSize-width={compact ? 512 : 1024}
        shadow-mapSize-height={compact ? 512 : 1024}
      />
      <spotLight position={[5, 6, 1]} angle={0.4} penumbra={1} intensity={34} color="#00ffb2" />
      <pointLight position={[0, 1.3, 2.6]} intensity={18} color="#ff8a00" distance={6} />
      <LightBeam position={[-3.7, 2.8, -1.7]} rotation={[0.1, 0, -0.42]} color="#00e5ff" />
      <LightBeam position={[3.8, 3.1, -2]} rotation={[0.08, 0, 0.48]} color="#00ffb2" />
      <Workspace reducedMotion={reducedMotion} />
      <GroundGrid />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#05080b" roughness={0.88} metalness={0.08} />
      </mesh>
      <ContactShadows
        position={[0.2, -2.16, 0]}
        opacity={0.54}
        scale={8}
        blur={2.7}
        far={4.2}
        resolution={compact ? 256 : 512}
        frames={1}
        color="#001b22"
      />
      <Sparkles
        count={compact ? 45 : 95}
        scale={[9, 6, 6]}
        size={compact ? 1.2 : 1.5}
        speed={reducedMotion ? 0 : 0.25}
        color="#9cf7ff"
        opacity={0.55}
        noise={1.2}
      />
      <CameraRig reducedMotion={reducedMotion} />
      <SceneReady onReady={onReady} />
      {!compact ? (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.82} luminanceThreshold={0.28} luminanceSmoothing={0.35} mipmapBlur />
          <Vignette eskil={false} offset={0.18} darkness={0.7} />
        </EffectComposer>
      ) : null}
      <AdaptiveDpr />
    </>
  );
}

export default function HeroCanvas({ reducedMotion = false, active = true, onReady }: HeroCanvasProps) {
  const compact = useMediaQuery("(max-width: 900px)", true);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        shadows={!compact}
        dpr={compact ? [1, 1.15] : [1, 1.4]}
        camera={{ position: [0.2, 1.12, 7.2], fov: compact ? 48 : 42, near: 0.1, far: 40 }}
        frameloop={reducedMotion || !active ? "demand" : "always"}
        gl={{ antialias: !compact, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        fallback={<div className="hero-canvas-fallback size-full" />}
      >
        <Suspense fallback={null}>
          <Scene reducedMotion={reducedMotion} compact={compact} onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
