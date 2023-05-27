import React, { useRef, useEffect } from 'react';

const RainEffectSmall = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.color = "red"

        canvas.width = window.innerWidth;
        canvas.height = 60;

        const lineCount = 2;
        const maxDropsPerLine = 4;
        const lineHeight = canvas.height / lineCount;
        const drops = [];

        const getRandomSentence = () => {
            const possibleSentences = [
                'A football stadium filled with cheering fans.',
                'The runner pushed past the finish line, gasping for air.',
                'The skateboarder soared through the air, executing a perfect 360 flip.',
                'The climber reached the summit, taking in the breathtaking view.',
                'The dog wagged its tail eagerly, waiting for its owner to throw the ball.',
                'The parrot squawked loudly, repeating the same phrase over and over.',
                'The fish darted back and forth in its tank, shimmering in the light.',
                'The bird perched on its owner\'s shoulder, chirping a happy tune.',
                'The carnival was in town, with bright lights and games for all ages',
                'The group of friends laughed and joked as they rode the roller coaster, their stomachs dropping as they reached the top of the first hill.',
                'The family gathered around the board game, each player strategizing to come out on top',
                'The beach was crowded with people playing volleyball, building sandcastles, and soaking up the sun.',
                'a man is sitting on the couch and using his mobile phone. He also is wearing a glasses.',
                'a man is sitting on the couch and using his laptop',
                'a man is sitting on the couch and he is drinking a glass of water. He is wearing a grey t shirt and a black pants',
                'a man is picking up his backpack and he is ready to go to school. He is wearing a grey t shirt and long blue jeans.'
            ];
            return possibleSentences[Math.floor(Math.random() * possibleSentences.length)];
        };

        class Drop {
            constructor(lineIndex, depth, text) {
                this.isDead = false;
                this.lineIndex = lineIndex;
                this.depth = depth;
                this.x = -Math.random() * canvas.width;
                this.y = lineHeight * lineIndex + lineHeight / 2;
                this.text = text;
                this.speed = Math.random() * 0.2 + 1 + depth * 0.2;
                this.opacity = Math.random() * 0.2 + 0.1 + depth * 0.1;
                ctx.font = '16px Arial';
                this.width = ctx.measureText(text).width;
            }

            update() {
                this.x += this.speed;
                if (this.x > canvas.width) {
                    this.x = -this.width;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.font = '16px Arial';
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fillText(this.text, this.x, this.y);
                ctx.closePath();
            }
        }

        for (let i = 0; i < lineCount; i++) {
            for (let j = 0; j < maxDropsPerLine; j++) {
                drops.push(new Drop(i, Math.random(), getRandomSentence()));
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

    return <canvas ref={canvasRef} />;
};

export default RainEffectSmall;