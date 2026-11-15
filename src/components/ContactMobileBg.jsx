import { useEffect, useRef } from "react";

const ContactMobileBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

    // Particle nodes
    const nodeCount = 38;
    const maxDistance = 105;
    const nodes = [];

    const colors = ["#8749f2", "#a855f7", "#c084fc", "#60a5fa", "#e879f9"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.35,
      });
    }

    // Touch / Interaction state
    const touch = {
      x: null,
      y: null,
      active: false,
      radius: 120,
    };

    // Shockwaves on tap
    const shockwaves = [];

    const addShockwave = (x, y) => {
      shockwaves.push({
        x,
        y,
        radius: 10,
        maxRadius: 130,
        alpha: 0.8,
        color: "#c084fc",
      });
    };

    const handleTouchStart = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      touch.x = clientX - rect.left;
      touch.y = clientY - rect.top;
      touch.active = true;
      addShockwave(touch.x, touch.y);
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      touch.x = clientX - rect.left;
      touch.y = clientY - rect.top;
      touch.active = true;
    };

    const handleTouchEnd = () => {
      touch.active = false;
      touch.x = null;
      touch.y = null;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Also listen to window pointer moves so touching anywhere on the section moves the particles
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    canvas.addEventListener("mousedown", handleTouchStart);
    canvas.addEventListener("mousemove", handleTouchMove);
    canvas.addEventListener("mouseup", handleTouchEnd);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep cyber background with radial glow
      const bgGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        20,
        width * 0.5,
        height * 0.5,
        width * 0.85
      );
      bgGlow.addColorStop(0, "rgba(22, 10, 42, 0.95)");
      bgGlow.addColorStop(0.5, "rgba(13, 6, 26, 0.98)");
      bgGlow.addColorStop(1, "rgba(5, 5, 8, 1)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Update and draw shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 3.5;
        sw.alpha -= 0.02;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 132, 252, ${sw.alpha})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#a855f7";
        ctx.stroke();
        ctx.restore();

        // Push nearby nodes away in wave
        nodes.forEach((n) => {
          const dx = n.x - sw.x;
          const dy = n.y - sw.y;
          const dist = Math.hypot(dx, dy);
          if (Math.abs(dist - sw.radius) < 25 && dist > 0) {
            const force = (1 - Math.abs(dist - sw.radius) / 25) * 1.8;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        });
      }

      // Draw interactive touch glow
      if (touch.active && touch.x !== null) {
        const touchGlow = ctx.createRadialGradient(
          touch.x,
          touch.y,
          0,
          touch.x,
          touch.y,
          touch.radius
        );
        touchGlow.addColorStop(0, "rgba(168, 85, 247, 0.35)");
        touchGlow.addColorStop(0.5, "rgba(135, 73, 242, 0.15)");
        touchGlow.addColorStop(1, "rgba(135, 73, 242, 0)");
        ctx.fillStyle = touchGlow;
        ctx.beginPath();
        ctx.arc(touch.x, touch.y, touch.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Move
        n.x += n.vx;
        n.y += n.vy;

        // Bounce on edges
        if (n.x < 0) {
          n.x = 0;
          n.vx *= -1;
        } else if (n.x > width) {
          n.x = width;
          n.vx *= -1;
        }
        if (n.y < 0) {
          n.y = 0;
          n.vy *= -1;
        } else if (n.y > height) {
          n.y = height;
          n.vy *= -1;
        }

        // Touch pull / interaction
        if (touch.active && touch.x !== null) {
          const dx = touch.x - n.x;
          const dy = touch.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < touch.radius && dist > 0) {
            // Gentle magnetic attraction to touch
            const force = (1 - dist / touch.radius) * 0.6;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;

            // Connect laser beam to touch
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(touch.x, touch.y);
            ctx.strokeStyle = `rgba(192, 132, 252, ${(1 - dist / touch.radius) * 0.65})`;
            ctx.lineWidth = 1.3;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#8749f2";
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.32;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = n.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("mousedown", handleTouchStart);
      canvas.removeEventListener("mousemove", handleTouchMove);
      canvas.removeEventListener("mouseup", handleTouchEnd);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
      />
    
    </div>
  );
};

export default ContactMobileBg;
