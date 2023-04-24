'use client'

import gsap from "gsap";
import React, { useLayoutEffect, useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "framer-motion";


gsap.registerPlugin(ScrollTrigger);


const styles = {
  canvas : 'w-screen h-screen object-cover',
  ballText : 'fixed z-2 text-white text-6xl right-1/4 bottom-1/4 transform -translate-x-1/5 -translate-y-4/10',
  heroHeading:
    "font-bold lg:text-[90px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px]",
}




const BallAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballTextRef = useRef(null);


  useIsomorphicLayoutEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    const frameCount = 179;
    const currentFrame = (index: number) => `/BallAnimationImages/${(index + 1).toString()}.jpg`;

    const images: any[] = [];
    let ball = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      console.log(currentFrame(i));
      images.push(img);
    }

    gsap.to(ball, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 0.5,
        pin: canvas,
        end: "500%",
      },
      onUpdate: render,
    });

    gsap.fromTo(
      ballTextRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scrollTrigger: {
          scrub: 1,
          start: "70%",
          end: "80%",
        },
        onComplete: () => {
          gsap.to(ballTextRef.current, { opacity: 0 });
        },
      }
    );

    images[0].onload = render;

    function render() {
      if (!context) return;
      context.canvas.width = images[0].width;
      context.canvas.height = images[0].height;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[ball.frame], 0, 0);
    }

    return () => {
      gsap.killTweensOf(ball);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };

  }, [canvasRef]);

  return (
    <div>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
      <div className={styles.ballText} ref={ballTextRef}>
        <h1 className={`${styles.heroHeading} text-4xl text-center font-bold`}>Smart Finance,</h1>
        <h1 className={`${styles.heroHeading} text-4xl text-center font-bold italic`}>Simplified</h1>
      </div>
    </div>
  );
};

export default BallAnimation;
