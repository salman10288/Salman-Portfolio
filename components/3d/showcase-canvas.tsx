"use client";

import { Suspense, useMemo, useRef, type CSSProperties } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, Html, RoundedBox, Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import type { Group } from "three";

import { useMediaQuery } from "@/hooks/use-media-query";

interface ShowcaseCanvasProps {
  reducedMotion?: boolean;
  active?: boolean;
  onReady?: () => void;
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

function CodePanel({ position, rotation, accent, title }: { position: [number, number, number]; rotation: [number, number, number]; accent: string; title: string }) {
  return (
    <Float speed={1.25} floatIntensity={0.45} rotationIntensity={0.18}>
      <group position={position} rotation={rotation}>
        <RoundedBox args={[1.25, 0.78, 0.045]} radius={0.05} smoothness={4} castShadow>
          <meshStandardMaterial color="#091016" emissive="#06131a" emissiveIntensity={0.7} metalness={0.45} roughness={0.28} />
        </RoundedBox>
        <Html transform center position={[0, 0, 0.031]} distanceFactor={1.25} zIndexRange={[7, 1]} style={{ pointerEvents: "none" }}>
          <div className="showcase-code" style={{ "--panel-accent": accent } as CSSProperties}>
            <span>{title}</span>
            <i />
            <i />
            <i />
            <i />
          </div>
        </Html>
      </group>
    </Float>
  );
}

function Monitor() {
  return (
    <group position={[-0.25, 0.65, 0]}>
      <RoundedBox args={[2.25, 1.38, 0.12]} radius={0.08} smoothness={4} castShadow>
        <meshStandardMaterial color="#0a1016" metalness={0.7} roughness={0.24} />
      </RoundedBox>
      <mesh position={[0, 0, 0.068]}>
        <planeGeometry args={[2.02, 1.16]} />
        <meshStandardMaterial color="#061017" emissive="#00303b" emissiveIntensity={1.35} roughness={0.35} />
      </mesh>
      <Html transform center position={[0, 0, 0.077]} distanceFactor={1.25} zIndexRange={[9, 1]} style={{ pointerEvents: "none" }}>
        <div className="monitor-ui">
          <div className="monitor-ui__nav"><b>SS</b><span /><span /><span /></div>
          <div className="monitor-ui__hero"><small>BUILDING</small><strong>Digital<br />experiences.</strong><i /></div>
        </div>
      </Html>
      <mesh position={[0, -0.92, 0]} castShadow>
        <boxGeometry args={[0.14, 0.52, 0.12]} />
        <meshStandardMaterial color="#111923" metalness={0.72} roughness={0.24} />
      </mesh>
      <mesh position={[0, -1.18, 0.05]} castShadow>
        <boxGeometry args={[0.85, 0.08, 0.5]} />
        <meshStandardMaterial color="#101821" metalness={0.72} roughness={0.24} />
      </mesh>
    </group>
  );
}

function Phone() {
  return (
    <Float speed={1.35} floatIntensity={0.5} rotationIntensity={0.16} position={[1.58, 0.18, 0.45]}>
      <group rotation={[0.06, -0.38, 0.04]}>
        <RoundedBox args={[0.64, 1.28, 0.09]} radius={0.13} smoothness={6} castShadow>
          <meshStandardMaterial color="#0a0e13" metalness={0.75} roughness={0.22} />
        </RoundedBox>
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[0.56, 1.12]} />
          <meshStandardMaterial color="#061218" emissive="#00313b" emissiveIntensity={1.1} />
        </mesh>
        <Html transform center position={[0, 0, 0.057]} distanceFactor={0.74} zIndexRange={[9, 1]} style={{ pointerEvents: "none" }}>
          <div className="phone-ui"><b>01</b><strong>PROJECT<br />SYSTEM</strong><span /><span /><span /></div>
        </Html>
      </group>
    </Float>
  );
}

function Server() {
  return (
    <Float speed={1.05} floatIntensity={0.32} rotationIntensity={0.1} position={[-1.85, -0.15, 0.42]}>
      <group rotation={[0, 0.32, 0]}>
        <RoundedBox args={[0.68, 1.42, 0.82]} radius={0.08} smoothness={4} castShadow>
          <meshStandardMaterial color="#101821" metalness={0.72} roughness={0.28} />
        </RoundedBox>
        {Array.from({ length: 5 }, (_, index) => (
          <group key={index} position={[0, 0.48 - index * 0.24, 0.425]}>
            <mesh><boxGeometry args={[0.52, 0.13, 0.025]} /><meshStandardMaterial color="#060b0f" /></mesh>
            <mesh position={[-0.19, 0, 0.021]}><sphereGeometry args={[0.018, 12, 12]} /><meshBasicMaterial color={index % 2 ? "#00ffb2" : "#00e5ff"} /></mesh>
            <mesh position={[-0.12, 0, 0.021]}><sphereGeometry args={[0.012, 12, 12]} /><meshBasicMaterial color="#ff8a00" /></mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

function Island({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current || reducedMotion) return;
    const alpha = 1 - Math.exp(-delta * 1.6);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(clock.elapsedTime * 0.22) * 0.12, alpha);
    group.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.035;
  });

  return (
    <group ref={group} rotation={[0, -0.08, 0]}>
      <mesh position={[0, -1.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.55, 2.1, 0.38, 64]} />
        <meshStandardMaterial color="#0c141a" metalness={0.48} roughness={0.36} />
      </mesh>
      <mesh position={[0, -1.07, 0]}>
        <torusGeometry args={[2.26, 0.035, 16, 96]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1.8} />
      </mesh>
      <Monitor />
      <Phone />
      <Server />
      <CodePanel position={[1.55, 1.65, -0.45]} rotation={[0.1, -0.4, -0.05]} accent="#00ffb2" title="API / STATUS" />
      <CodePanel position={[-1.65, 1.55, -0.65]} rotation={[-0.02, 0.42, 0.04]} accent="#00e5ff" title="UI / SYSTEM" />
    </group>
  );
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0.05, 0), []);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const alpha = 1 - Math.exp(-delta * 2.2);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.58, alpha);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.05 + pointer.y * 0.28, alpha);
    camera.lookAt(target);
  });

  return null;
}

function Scene({ reducedMotion, compact, onReady }: { reducedMotion: boolean; compact: boolean; onReady?: () => void }) {
  return (
    <>
      <ambientLight intensity={0.38} />
      <hemisphereLight args={["#c9fbff", "#020506", 0.55]} />
      <spotLight position={[-4, 6, 4]} intensity={44} angle={0.42} penumbra={0.9} color="#00e5ff" castShadow={!compact} />
      <spotLight position={[4, 5, 1]} intensity={36} angle={0.45} penumbra={1} color="#00ffb2" />
      <pointLight position={[0, 0.5, 3]} intensity={16} color="#ff8a00" distance={7} />
      <Island reducedMotion={reducedMotion} />
      <ContactShadows position={[0, -1.46, 0]} opacity={0.55} scale={7} blur={2.6} far={4} resolution={compact ? 256 : 512} frames={1} color="#001a22" />
      <Sparkles count={compact ? 28 : 65} scale={[7, 5, 5]} size={1.4} speed={reducedMotion ? 0 : 0.22} color="#b6fbff" opacity={0.52} />
      <CameraRig reducedMotion={reducedMotion} />
      <SceneReady onReady={onReady} />
      {!compact ? (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.9} luminanceThreshold={0.26} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette eskil={false} offset={0.18} darkness={0.72} />
        </EffectComposer>
      ) : null}
    </>
  );
}

export default function ShowcaseCanvas({ reducedMotion = false, active = true, onReady }: ShowcaseCanvasProps) {
  const compact = useMediaQuery("(max-width: 900px)", true);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        shadows={!compact}
        dpr={compact ? [1, 1.1] : [1, 1.35]}
        camera={{ position: [0, 1.05, 7.4], fov: compact ? 48 : 42, near: 0.1, far: 35 }}
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
