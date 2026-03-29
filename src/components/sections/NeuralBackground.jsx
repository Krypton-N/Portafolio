import React, { useEffect, useRef } from 'react';

const NeuralBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let pulses = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow, organic drift
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                // Rose-500 (#f43f5e) particles
                ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class Pulse {
            constructor(p1, p2, dist, cpX, cpY) {
                this.p1 = p1; // Start particle
                this.p2 = p2; // End particle
                this.cpX = cpX; // Control point X (snapshot)
                this.cpY = cpY; // Control point Y (snapshot)
                this.progress = 0;
                this.speed = 2 / dist; // Speed relative to distance
                this.dead = false;
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.dead = true;
                }
            }

            draw() {
                if (this.dead) return;

                // Quadratic Bezier interpolation
                const t = this.progress;
                const invT = 1 - t;

                // B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
                const x = (invT * invT) * this.p1.x + 2 * invT * t * this.cpX + (t * t) * this.p2.x;
                const y = (invT * invT) * this.p1.y + 2 * invT * t * this.cpY + (t * t) * this.p2.y;

                // Draw glowing pulse head (Cyan/White)
                ctx.beginPath();
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#22d3ee'; // Cyan-400
                ctx.fillStyle = '#ffffff';
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            }
        }

        const init = () => {
            particles = [];
            // Calculate number of particles based on screen area to keep density consistent
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 18000);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Clear canvas with slight fade for trails? No, sticking to clean clear for now.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Use 'lighter' for that electric/biopunk blend look
            ctx.globalCompositeOperation = 'lighter';

            // 1. Update and Draw Particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // 2. Draw Connections & Generate Pulses
            const maxDistance = 200; // Connection range

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];

                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < maxDistance * maxDistance) {
                        const dist = Math.sqrt(distSq);
                        const opacity = 1 - dist / maxDistance;

                        // Calculate Organic Curve Control Point
                        // Midpoint
                        const midX = (p1.x + p2.x) / 2;
                        const midY = (p1.y + p2.y) / 2;

                        // Offset based on positions and time to make it "breathe"
                        const time = Date.now() * 0.002;
                        // Use indices to keep the offset systematic for a pair
                        const offsetMagnitude = 30 * opacity; // Curves are tighter when closer? Or wider?
                        const angle = Math.atan2(dy, dx) + Math.PI / 2; // Perpendicular direction

                        // Oscillate the control point
                        const sway = Math.sin(time + (i * j)) * offsetMagnitude;

                        const cpX = midX + Math.cos(angle) * sway;
                        const cpY = midY + Math.sin(angle) * sway;

                        // Draw Curve (Axon)
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(225, 29, 72, ${opacity * 0.15})`; // Rose-600, low opacity
                        ctx.lineWidth = 4;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y);
                        ctx.stroke();

                        // 3. Random Synaptic Pulse
                        // Probability chance per frame
                        if (Math.random() < 0.002) {
                            // 50/50 chance of direction
                            if (Math.random() > 0.5) {
                                pulses.push(new Pulse(p1, p2, dist, cpX, cpY));
                            } else {
                                pulses.push(new Pulse(p2, p1, dist, cpX, cpY));
                            }
                        }
                    }
                }
            }

            // 4. Update and Draw Pulses
            for (let i = pulses.length - 1; i >= 0; i--) {
                pulses[i].update();
                pulses[i].draw();
                if (pulses[i].dead) {
                    pulses.splice(i, 1);
                }
            }

            // Reset composite
            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
        />
    );
};

export default NeuralBackground;
