import styles from '../styles'

const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <div className={`${styles.innerWidth} mx-auto flex flex-col items-center justify-center`}>
      <h1 className={`${styles.heroHeading} text-4xl text-center font-bold`}>Smart Finance,</h1>
      <h1 className={`${styles.heroHeading} text-4xl text-center font-bold italic`}>Simplified.</h1>
      <img src="/neuralfin-logo/neuralfin-logo-beta-transpb.png" alt="NeuralFin Logo" className="w-64 h-64 mt-6" />
    </div>
  </section>
);

export default Hero;
