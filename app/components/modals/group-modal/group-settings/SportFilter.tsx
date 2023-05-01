'use client'

import Toggle from 'react-toggle';
import styles from './GroupSettings.module.scss';
import { useState } from 'react';
import { sports } from './SportsList';
type SportFilterProps = {
 setCustomValue: (value: string, id: any) => void;
}

const SportFilter: React.FC<SportFilterProps> = ({ setCustomValue }) => {

 const [showAllSports, setShowAllSports] = useState(true)

 return (
  <>
   <div className={styles.setting} style={{ cursor: 'pointer' }}>
    <div className={styles.text}>
     <p className={styles.name}>Show All Sports</p>
    </div>
    <div className={styles.toggle}>
     <Toggle
      defaultChecked={true}
      onChange={() => { { setShowAllSports(!showAllSports); setCustomValue('showAllSports', showAllSports) } }} icons={false} />
    </div>
   </div>

   {!showAllSports && (
    sports.map((sport) => (
     <div className={styles.setting} style={{ cursor: 'pointer' }} key={sport.label}>
      <div className={styles.text}>
       <p className={styles.name}>{sport.description}</p>
      </div>
      <div className={styles.toggle}>
       <Toggle
        defaultChecked={false}
        onChange={() => { { setCustomValue('showSport', sport.label) } }} icons={false} />
      </div>
     </div>
    ))

   )}
  </>

 );
}

export default SportFilter;