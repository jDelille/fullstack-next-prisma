import Toggle from 'react-toggle';
import styles from '../Modal.module.scss';
import Input from '../../input/Input';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type MembersProps = {
 setCustomValue: (id: string, value: any) => void;
 isLoading?: boolean;
 register: UseFormRegister<FieldValues>;
 errors: FieldErrors;
 required?: boolean;
}

const Members: React.FC<MembersProps> = ({ isLoading, register, errors, required, setCustomValue }) => {
 return (
  <div className={styles.advancedSettings}>
   <div className={styles.setting}>
    <div className={styles.text}>
     <p className={styles.name}>Limit number of members</p>
     <p className={styles.description}>Limit how many users can join this group.</p>
    </div>
    <div className={styles.toggle}>
     <Toggle
      defaultChecked={true}
      onChange={() => { setCustomValue('postNotification', true) }} icons={false} />
    </div>
   </div>
   <div className={styles.setting}>
    <div className={styles.text}>
     <p className={styles.description}>Maximum Members in Group</p>
    </div>
    <div className={styles.toggle}>
     <Input errors={errors} id='numberOfMembers' label='' type='number'
      onChange={(e) => setCustomValue('numberOfMembers', e.target.value)} register={register} />
    </div>
   </div>
  </div>
 );
}

export default Members;