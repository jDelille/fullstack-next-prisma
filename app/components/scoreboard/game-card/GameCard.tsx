import { Game } from "@/app/types/Game";
import styles from './GameCard.module.scss';
import Image from "next/image";

type GameCardProps = {
 game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {

 console.log(game)

 return (
  <div className={styles.gameCard}>
   {/* <div className={styles.status}>
    <p>{game.status.type.shortDetail}</p>
   </div> */}
   <div className={styles.teams}>
    {game.competitions.map((team) => (
     <>
      <div key={team.id} className={styles.team}>
       <Image src={team.competitors[0].team.logo} alt="logo" width={20} height={20} />
       <p>{team.competitors[0].team.abbreviation}</p>
       <p className={styles.score}>{team.competitors[0].score}</p>
      </div>
      <div key={team.id} className={styles.team}>
       <Image src={team.competitors[1].team.logo} alt="logo" width={20} height={20} />
       <p>{team.competitors[1].team.abbreviation}</p>
       <p className={styles.score}>{team.competitors[0].score}</p>

      </div>
     </>
    ))}
   </div>
  </div>
 );
}

export default GameCard;