import React, { useRef, useEffect } from 'react';

const RainEffect = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = 315;

        const lineCount = 30;
        const maxDropsPerLine = 5;
        const lineWidth = canvas.width / lineCount;
        const lineHeight = canvas.height / lineCount;
        const drops = [];

        class Drop {
            constructor(lineIndex, depth, isHorizontal) {
                this.isDead = false;
                this.isHorizontal = isHorizontal;
                this.lineIndex = lineIndex;
                this.depth = depth;
                this.x = isHorizontal ? -Math.random() * canvas.width : lineWidth * lineIndex + lineWidth / 2;
                this.y = isHorizontal ? lineHeight * lineIndex + lineHeight / 2 : -Math.random() * canvas.height;
                this.length = Math.random() * 20 + 10;
                this.speed = Math.random() * 0.2  + 1 + depth * 0.2;
                this.opacity = Math.random() * 0.2 + 0.1 + depth * 0.1;
            }

            update() {
                if (this.isHorizontal) {
                    this.x += this.speed;
                    if (this.x > canvas.width) {
                        this.x = -this.length;
                    }
                } else {
                    this.y += this.speed;
                    if (this.y > canvas.height) {
                        this.y = -this.length;
                    }
                }
            }


            draw() {
                ctx.beginPath();
                if (this.isHorizontal) {
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x + this.length, this.y);
                } else {
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x, this.y + this.length);
                }
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.lineWidth = 1 + this.depth;
                ctx.stroke();
            }
        }

        for (let i = 0; i < lineCount; i++) {
            for (let j = 0; j < maxDropsPerLine; j++) {
                drops.push(new Drop(i, Math.random(), false));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);


            for (let drop of drops) {
                drop.update();
                drop.draw();
            }

            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return <canvas ref={canvasRef} className="rain-background" />;
};

export default RainEffect;