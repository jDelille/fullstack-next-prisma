import Toggle from 'react-toggle';
import styles from '../Modal.module.scss';

type MySettingsProps = {
 setCustomValue: (id: string, value: any) => void;

}

const MySettings: React.FC<MySettingsProps> = ({ setCustomValue }) => {
 return (
  <div className={styles.advancedSettings}>
   <div className={styles.setting}>
    <div className={styles.text}>
     <p className={styles.name}>Group Bet Notifications</p>
     <p className={styles.description}>Get notified of any bets sent to this group.</p>
    </div>
    <div className={styles.toggle}>
     <Toggle
      defaultChecked={true}
      onChange={() => { setCustomValue('postNotification', true) }} icons={false} />
    </div>
   </div>
   <div className={styles.setting}>
    <div className={styles.text}>
     <p className={styles.name}>Group Chat Notifications</p>
     <p className={styles.description}>Get notified of any posts sent to this group.</p>
    </div>
    <div className={styles.toggle}>
     <Toggle
      defaultChecked={true}
      onChange={() => { setCustomValue('postNotification', true) }} icons={false} />
    </div>
   </div>
  </div>
 );
}

export default MySettings;