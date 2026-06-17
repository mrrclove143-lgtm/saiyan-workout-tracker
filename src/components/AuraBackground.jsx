import React, { useEffect, useRef } from "react";

export default function AuraBackground({ isPoweringUp = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Handle resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particles array
    let particles = [];
    const maxParticles = isPoweringUp ? 120 : 50;

    class Particle {
      constructor() {
        this.reset();
        // Stagger spawn heights on init
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.radius = Math.random() * (isPoweringUp ? 4 : 3) + 1;
        this.speedY = -(Math.random() * (isPoweringUp ? 3.5 : 1.2) + 0.5);
        this.speedX = (Math.random() - 0.5) * (isPoweringUp ? 2 : 0.6);
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
        
        // Colors: Super Saiyan gold/yellow when powering up, Goku orange when resting/normal
        if (isPoweringUp) {
          const rand = Math.random();
          if (rand > 0.6) {
            this.color = { r: 255, g: 220, b: 0 }; // Yellow
          } else if (rand > 0.2) {
            this.color = { r: 255, g: 140, b: 0 }; // Orange-Yellow
          } else {
            this.color = { r: 255, g: 255, b: 255 }; // Electric White spark
          }
        } else {
          // Soft orange/red particles
          this.color = {
            r: 255,
            g: Math.floor(Math.random() * 80 + 70), // 70 to 150
            b: 0
          };
        }
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life++;

        // Drifting effect
        if (isPoweringUp) {
          this.speedX += (Math.random() - 0.5) * 0.4;
          // cap horizontal drift
          this.speedX = Math.max(-3, Math.min(3, this.speedX));
        }

        if (this.life >= this.maxLife || this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        const opacity = Math.min(1, 1 - this.life / this.maxLife) * (isPoweringUp ? 0.8 : 0.4);
        
        // Draw energy spark
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * (isPoweringUp ? 3.5 : 2.5)
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`);
        gradient.addColorStop(0.3, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius * (isPoweringUp ? 4 : 3), 0, Math.PI * 2);
        ctx.fill();

        // Extra central highlight for big aura bursts
        if (isPoweringUp && this.radius > 3 && Math.random() > 0.85) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
          ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Ambient background glow from bottom
      const bottomGlow = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 120);
      const glowOpacity = isPoweringUp ? 0.22 : 0.08;
      const glowColor = isPoweringUp ? "255, 174, 0" : "255, 107, 0";
      bottomGlow.addColorStop(0, `rgba(${glowColor}, ${glowOpacity})`);
      bottomGlow.addColorStop(1, `rgba(${glowColor}, 0)`);
      
      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, canvas.height - 120, canvas.width, 120);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPoweringUp]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
