import { useEffect, useRef } from 'react';

const styles = {
  linecontainer: " overflow-hidden top-0 left-0 w-full h-full"
};

interface LineAnimationProps {
  scrollContainer: HTMLElement | null;
}


const LineAnimation: React.FC<LineAnimationProps> = ({ scrollContainer }) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (scrollContainer && pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();
      path.style.strokeDasharray = length + ' ' + length;
      path.style.strokeDashoffset = length.toString();

      const updateLineDrawing = () => {
        const scrollFraction = scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight);
        const offset = length - (scrollFraction * length);
        path.style.strokeDashoffset = offset.toString();
      };

      scrollContainer.addEventListener('scroll', updateLineDrawing);
      return () => scrollContainer.removeEventListener('scroll', updateLineDrawing);
    }
  }, [scrollContainer, pathRef]);

  return (
    <div className={styles.linecontainer}>
      <svg viewBox="0 0 597 2163" fill="none" preserveAspectRatio="xMidYMax meet">
        <path ref={pathRef} d="M84.5 0V639.5C85.3334 721.5 139.2 864.4 348 780C609 674.5 630 776 557.5 856C485 936 251.5 1021 155 1041.5C58.5 1062 -27 1058.5 84.5 1145.5C196 1232.5 164 1243.5 84.5 1271.5C5.00001 1299.5 -51 1372 84.5 1420C220 1468 156.5 1555 84.5 1599.5C12.5 1644 32.5 1707 84.5 1770C136.5 1833 84.5 1907.5 84.5 1924C84.5 1940.5 58.5 1966.5 84.5 2037C105.3 2093.4 93.1667 2133.5 84.5 2146.5V2163" stroke="black" strokeWidth="5"/>
      </svg>
    </div>
  );
};

export default LineAnimation;
