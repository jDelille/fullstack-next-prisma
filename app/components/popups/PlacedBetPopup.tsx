'use client';

import usePlacedBetPopup from "@/app/hooks/usePlacedBetPopup";
import Popup from "./Popup";
import { IoMdClose } from "react-icons/io";
import Button from "../button/Button";
import Link from "next/link";
import betStore from "@/app/store/betStore";
import styles from './Popup.module.scss';


const PlacedBetPopup: React.FC = () => {

 const placedBetPopup = usePlacedBetPopup();

 const placedBet = betStore.selectedBet

 const backToFeed = () => {
  betStore.selectedBet = [];
  betStore.wager = 0;
  betStore.parlayOdds = 0
  betStore.odds = 0;
  betStore.payout = 0;
  placedBetPopup.onClose()
 }

 const stayOnPage = () => {
  betStore.selectedBet = [];
  betStore.wager = 0;
  betStore.parlayOdds = 0
  betStore.odds = 0;
  betStore.payout = 0;
  placedBetPopup.onClose()
 }

 const bodyContent = (
  <div>


   <div className={styles.betView}>
    {placedBet.map((bet, i) => (
     <div key={i} className={styles.game}>
      <div className={styles.team}>
       <span>{bet.abbreviation}</span>
       <p>{bet.team}</p>
       <p className={styles.odds}>{bet.odds}</p>
      </div>
      <div className={styles.type}>
       <p>{bet.type} <span>{bet.value}</span></p>
      </div>
      <p className={styles.matchup}>{bet.name}</p>

     </div>
    ))}
    <div className={styles.money}>
     <p>Odds: <span>{betStore.parlayOdds}</span></p>
     <p>Amount wagered: <span>${betStore.wager}</span></p>
     <p>Net payout: <span>${betStore.payout}</span></p>
    </div>
   </div>
   <div className={styles.viewFeed}>
    <p>View your bet on the feed. </p>
    <Link href={'/'} onClick={backToFeed}>View feed</Link>
   </div>
   <div className={styles.stayHere}>
    <p>Stay here and continue placing bets.</p>
    <span onClick={stayOnPage}>Stay here</span>
   </div>
  </div>
 )

 return (
  <Popup
   isOpen={placedBetPopup.isOpen}
   onClose={placedBetPopup.onClose}
   title='Successfully placed bet'
   action={() => { }}
   body={bodyContent}
   icon={IoMdClose}

  />
 );
}

export default PlacedBetPopup;