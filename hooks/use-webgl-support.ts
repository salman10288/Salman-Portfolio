"use client";

import { useEffect, useState } from "react";

let cachedSupport: boolean | null = null;

function detectWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    const attributes: WebGLContextAttributes = {
      alpha: true,
      failIfMajorPerformanceCaveat: true,
    };
    const context =
      canvas.getContext("webgl2", attributes) ?? canvas.getContext("webgl", attributes);
    const supported = Boolean(context);

    if (context) {
      context.getExtension("WEBGL_lose_context")?.loseContext();
    }

    return supported;
  } catch {
    return false;
  }
}

export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(cachedSupport);

  useEffect(() => {
    if (cachedSupport === null) {
      cachedSupport = detectWebGLSupport();
    }

    setSupported(cachedSupport);
  }, []);

  return supported;
}
