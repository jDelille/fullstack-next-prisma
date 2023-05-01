import styles from '../Modal.module.scss';

type TabsProps = {
 setStep: (value: number) => void;
 step: number;
};

const Tabs: React.FC<TabsProps> = ({ setStep, step }) => {
 return (
  <div className={styles.tabs}>
   <p className={step === 0 ? styles.selected : styles.tab} onClick={() => setStep(0)}>
    Group Settings
   </p>
   <p className={step === 1 ? styles.selected : styles.tab} onClick={() => setStep(1)}>
    My Settings
   </p>
   <p className={step === 2 ? styles.selected : styles.tab} onClick={() => setStep(2)}>
    Members
   </p>
  </div>
 );
};

export default Tabs;
