import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Renderer, Camera, Program, Mesh, Geometry } from 'ogl';

/**
 * TENSOR FIELD v2 — volumetric 3D flow (VisualSystem.md §3, revised after
 * owner feedback: the field must have obvious depth and presence).
 *
 * Thousands of curved ribbon trails advect through a 3D noise flow inside a
 * perspective-projected volume. Depth cues: perspective scaling, distance fog,
 * and a camera that drifts with the cursor (parallax). Scroll drives
 * uTemperature 1→0: turbulent volume in the hero → calm laminar streams at
 * contact. The cursor also injects a 3D radial repulsion that relaxes ~1.5s.
 *
 * Still a single instanced draw call: each instance is one ribbon (quadratic
 * bezier centerline bent by two flow samples, billboarded in view space).
 *
 * Fallbacks: prefers-reduced-motion or no WebGL2 → static CSS veil, no canvas.
 */

const SEGMENTS = 14;

const VERTEX = /* glsl */ `#version 300 es
precision highp float;

in vec2 position;   // x = t along trail [0,1], y = side [-0.5, 0.5]
in vec3 iOrigin;    // trail origin in world units
in float iSeed;     // per-trail random [0,1]

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uTemperature;     // 1 turbulence → 0 laminar convergence
uniform vec3  uPointer;         // pointer projected to world space (z≈0 plane)
uniform float uPointerStrength; // 0..1, decays over ~1.5s

out float vT;
out float vEnergy;
out float vFog;
out float vSeed;

// ── 2D simplex noise (Ashima / Ian McEwan, public domain) ──
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// Pseudo-3D flow direction from three 2D noise planes
vec3 flowDir(vec3 p) {
    float f = mix(0.16, 0.42, uTemperature);
    float s = mix(0.04, 0.22, uTemperature);
    float n1 = snoise(p.xy * f + vec2(p.z * 0.31, uTime * s));
    float n2 = snoise(p.yz * f + vec2(3.7 + p.x * 0.27, uTime * s * 0.8));
    float n3 = snoise(p.zx * f + vec2(7.3 + p.y * 0.23, uTime * s * 0.6));
    vec3 d = normalize(vec3(n1, n2, n3 * 0.7) + vec3(1e-3));
    // converge to a shared laminar stream as temperature drops
    return normalize(mix(vec3(1.0, 0.04, 0.0), d, uTemperature));
}

void main() {
    float t = position.x;
    float side = position.y;

    vec3 o = iOrigin;

    // 3D cursor repulsion on the trail origin
    vec3 toP = o - uPointer;
    float dp2 = dot(toP, toP);
    float infl = exp(-dp2 / 7.0) * uPointerStrength;
    o += (toP * inversesqrt(dp2 + 1e-3)) * infl * 1.6;

    // Curved centerline: quadratic bezier bent by two flow samples
    float lenT = mix(1.2, 2.8, fract(iSeed * 7.31)) * mix(0.6, 1.0, 0.5 + 0.5 * uTemperature);
    vec3 d0 = flowDir(o);
    vec3 P1 = o + d0 * lenT * 0.5;
    vec3 d1 = flowDir(P1);
    vec3 P2 = P1 + d1 * lenT * 0.5;

    float it = 1.0 - t;
    vec3 c = it * it * o + 2.0 * it * t * P1 + t * t * P2;
    vec3 tang = normalize(2.0 * it * (P1 - o) + 2.0 * t * (P2 - P1));

    // Billboard the ribbon toward the camera in view space
    vec4 mvPos = modelViewMatrix * vec4(c, 1.0);
    vec3 tangV = normalize(mat3(modelViewMatrix) * tang);
    vec3 sideV = normalize(cross(tangV, vec3(0.0, 0.0, 1.0)) + vec3(1e-4));

    float taper = sin(3.14159 * t);                       // sharp ends
    float width = mix(0.025, 0.075, fract(iSeed * 3.17)) * taper * (1.0 + infl * 2.5);
    mvPos.xyz += sideV * side * width;

    gl_Position = projectionMatrix * mvPos;

    float energy = 0.5 + 0.5 * snoise(o.xy * 0.45 + vec2(uTime * 0.08, iSeed * 9.4));
    energy = mix(0.3, energy, uTemperature) + infl * 1.4;

    float dist = length(mvPos.xyz);
    vFog = smoothstep(30.0, 9.0, dist);                   // near 1 → far 0

    vT = t;
    vEnergy = clamp(energy, 0.0, 1.5);
    vSeed = iSeed;
}
`;

const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;

in float vT;
in float vEnergy;
in float vFog;
in float vSeed;

out vec4 fragColor;

void main() {
    // zinc → rose-700 → rose-400, gated by energy so rose stays scarce
    vec3 dim    = vec3(0.55, 0.55, 0.64);
    vec3 roseLo = vec3(0.80, 0.14, 0.30);
    vec3 rose   = vec3(1.0, 0.36, 0.48);
    vec3 col = mix(dim, roseLo, smoothstep(0.45, 0.85, vEnergy));
    col = mix(col, rose, smoothstep(0.9, 1.25, vEnergy));

    // depth: near trails bright and saturated, far trails sink into the dark
    col *= mix(0.25, 1.0, vFog);

    float ends = smoothstep(0.0, 0.12, vT) * smoothstep(1.0, 0.88, vT);
    float alpha = ends
        * mix(0.18, 0.85, vFog)
        * mix(0.5, 1.0, smoothstep(0.2, 1.2, vEnergy))
        * mix(0.7, 1.0, vSeed);

    fragColor = vec4(col, alpha);
}
`;

/** loss(t) = 0.003 + 2.844·t² → 2.847 at the hero, 0.003 at contact */
const lossOf = (t) => 0.003 + 2.844 * t * t;

const CAM_Z = 14;
const FOV = 45;

const buildTrailGeometry = (gl, count, aspect) => {
    // Shared ribbon strip: (SEGMENTS+1) pairs of vertices, indexed quads
    const verts = (SEGMENTS + 1) * 2;
    const pos = new Float32Array(verts * 2);
    for (let i = 0; i <= SEGMENTS; i++) {
        const t = i / SEGMENTS;
        pos[(i * 2) * 2] = t;
        pos[(i * 2) * 2 + 1] = -0.5;
        pos[(i * 2 + 1) * 2] = t;
        pos[(i * 2 + 1) * 2 + 1] = 0.5;
    }
    const index = new Uint16Array(SEGMENTS * 6);
    for (let i = 0; i < SEGMENTS; i++) {
        const a = i * 2;
        index.set([a, a + 1, a + 2, a + 2, a + 1, a + 3], i * 6);
    }

    // Trail origins fill a depth slab larger than the frustum at z=0
    const halfH = Math.tan((FOV / 2) * (Math.PI / 180)) * CAM_Z; // ≈ 5.8
    const spanY = halfH + 2.5;
    const spanX = halfH * aspect + 3.5;
    const origins = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        origins[i * 3] = (Math.random() * 2 - 1) * spanX;
        origins[i * 3 + 1] = (Math.random() * 2 - 1) * spanY;
        origins[i * 3 + 2] = -11 + Math.random() * 17; // z ∈ [-11, 6]
        seeds[i] = Math.random();
    }

    return new Geometry(gl, {
        position: { size: 2, data: pos },
        index: { data: index },
        iOrigin: { instanced: 1, size: 3, data: origins },
        iSeed: { instanced: 1, size: 1, data: seeds },
    });
};

const TensorField = () => {
    const containerRef = useRef(null);
    const lossRef = useRef(null);
    const pathnameRef = useRef('/');
    const { pathname } = useLocation();
    pathnameRef.current = pathname;

    const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (reducedMotion) return;
        const container = containerRef.current;
        if (!container) return;

        let renderer;
        try {
            renderer = new Renderer({
                dpr: Math.min(window.devicePixelRatio || 1, 1.5),
                alpha: true,
                premultipliedAlpha: false,
                antialias: true,
                depth: false,
                webgl: 2,
            });
        } catch {
            return; // no WebGL2 → CSS fallback stays
        }
        const gl = renderer.gl;
        if (!gl) return;

        gl.canvas.style.position = 'absolute';
        gl.canvas.style.inset = '0';
        container.appendChild(gl.canvas);

        gl.clearColor(0, 0, 0, 0);

        const camera = new Camera(gl, { fov: FOV, near: 0.5, far: 60 });
        camera.position.set(0, 0, CAM_Z);

        const program = new Program(gl, {
            vertex: VERTEX,
            fragment: FRAGMENT,
            transparent: true,
            // billboarded ribbons can wind either way — never cull
            cullFace: false,
            depthTest: false,
            depthWrite: false,
            uniforms: {
                uTime: { value: 0 },
                uTemperature: { value: 1 },
                uPointer: { value: [9999, 9999, 0] },
                uPointerStrength: { value: 0 },
            },
        });

        let mesh = null;
        const rebuild = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            renderer.setSize(w, h);
            camera.perspective({ aspect: w / h });
            const isMobile = w < 768;
            const count = isMobile ? 900 : 2400;
            if (mesh) mesh.geometry.remove();
            mesh = new Mesh(gl, { geometry: buildTrailGeometry(gl, count, w / h), program });
        };
        rebuild();

        let resizeTimer;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(rebuild, 200);
        };
        window.addEventListener('resize', onResize);

        // ── Pointer: NDC for parallax, world-projected for repulsion ──
        const halfH = Math.tan((FOV / 2) * (Math.PI / 180)) * CAM_Z;
        const pointer = { nx: 0, ny: 0, sx: 0, sy: 0, strength: 0, lastX: 0, lastY: 0 };
        const onPointerMove = (e) => {
            pointer.nx = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.ny = -((e.clientY / window.innerHeight) * 2 - 1);
            const dx = e.clientX - pointer.lastX;
            const dy = e.clientY - pointer.lastY;
            pointer.lastX = e.clientX;
            pointer.lastY = e.clientY;
            const vel = Math.min(Math.hypot(dx, dy) / 40, 1);
            pointer.strength = Math.min(1, pointer.strength + vel * 0.5);
        };
        window.addEventListener('pointermove', onPointerMove, { passive: true });

        // ── Animation loop ──
        let rafId = null;
        let temp = 1;
        let frame = 0;
        const start = performance.now();

        const targetTemperature = () => {
            const path = pathnameRef.current;
            if (path.startsWith('/project')) return 0.12; // calm field behind reading
            if (path !== '/') return 0.2;                  // secondary pages: near-converged
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
            return 1 - progress;
        };

        const tick = (now) => {
            rafId = requestAnimationFrame(tick);

            temp += (targetTemperature() - temp) * 0.05;
            pointer.sx += (pointer.nx - pointer.sx) * 0.06;
            pointer.sy += (pointer.ny - pointer.sy) * 0.06;
            pointer.strength *= 0.972; // ~1.5s relaxation at 60fps

            // Camera parallax: drift toward the cursor, ease back when idle
            const aspect = window.innerWidth / window.innerHeight;
            camera.position.x = pointer.sx * 1.5;
            camera.position.y = pointer.sy * 1.0;
            camera.position.z = CAM_Z - (1 - temp) * 2.0; // gentle dolly-in while converging
            camera.lookAt([0, 0, -2]);

            program.uniforms.uTime.value = (now - start) / 1000;
            program.uniforms.uTemperature.value = temp;
            program.uniforms.uPointer.value = [
                pointer.sx * halfH * aspect,
                pointer.sy * halfH,
                0,
            ];
            program.uniforms.uPointerStrength.value = pointer.strength;

            if (mesh) renderer.render({ scene: mesh, camera });

            // Loss counter: imperative DOM update, throttled
            if (lossRef.current && frame % 6 === 0) {
                lossRef.current.textContent = `loss: ${lossOf(temp).toFixed(3)}`;
            }
            frame++;
        };
        rafId = requestAnimationFrame(tick);

        const stop = () => { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } };
        const onVisibility = () => {
            if (document.hidden) stop();
            else if (rafId === null) rafId = requestAnimationFrame(tick);
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            stop();
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('pointermove', onPointerMove);
            clearTimeout(resizeTimer);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
            gl.canvas.remove();
        };
    }, [reducedMotion]);

    const isHome = pathname === '/';

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0"
            aria-hidden="true"
        >
            {/* Static elegant fallback (also visible during canvas boot) */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(159,18,57,0.10), transparent 60%), radial-gradient(ellipse 60% 50% at 80% -10%, rgba(244,63,94,0.05), transparent 55%)',
                }}
            />
            {/* Loss counter — narrates the gradient descent (home only) */}
            {isHome && !reducedMotion && (
                <div className="hidden md:block fixed bottom-5 left-6 font-mono text-xs text-zinc-600 tracking-wider select-none">
                    <span ref={lossRef}>loss: 2.847</span>
                </div>
            )}
        </div>
    );
};

export default TensorField;
