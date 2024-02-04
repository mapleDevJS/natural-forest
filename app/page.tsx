import dynamic from 'next/dynamic'
import styles from './page.module.css'
import ThreeDLens from './components/3d-lens/ThreeDLens';

const RainComponent = dynamic(() => import('./components/rain/Rain'), {ssr: false});

export default function Home() {
  return (
        <ThreeDLens>
          <div className={styles.logo} style={{backgroundImage: `url(/img/logo.svg)`}}></div>
          <section className={styles.layers}>
            <div className={styles.layersContainer}>
              <div className={`${styles.layersItem} ${styles.layer1}`} style={{backgroundImage: `url(/img/layer-1.jpg)`}}></div>
              <div className={`${styles.layersItem} ${styles.layer2}`} style={{backgroundImage: `url(/img/layer-2.png)`}}></div>
              <div className={`${styles.layersItem} ${styles.layer3}`}>
                <div className={styles.heroContent}>
                  <h1>Natural Forest <span>HTML / CSS</span></h1>
                  <p className={styles.heroContentText}>Creating a beautiful 3D website with a ‘lens effect’</p>
                  <button className={styles.buttonStart}>Start Learning</button>
                </div>
              </div>
              <div className={`${styles.layersItem} ${styles.layer4}`}>
                <RainComponent />
              </div>
              <div className={`${styles.layersItem} ${styles.layer5}`} style={{backgroundImage: `url(/img/layer-5.png)`}}></div>
              <div className={`${styles.layersItem} ${styles.layer6}`} style={{backgroundImage: `url(/img/layer-6.png)`}}></div>
            </div>
          </section>
        </ThreeDLens>
  )
}
