import { FaFootballBall, FaBasketballBall, FaHockeyPuck, FaBaseballBall } from 'react-icons/fa'
import { GiSoccerBall, GiBoxingGloveSurprise } from 'react-icons/gi'


export const sports = [
 {
  label: 'NBA',
  icon: FaBasketballBall,
  description: 'National Basketball Association'
 },
 {
  label: 'NFL',
  icon: FaFootballBall,
  description: 'National Football League'
 },
 {
  label: 'MLB',
  icon: FaBaseballBall,
  description: 'Major League Baseball'
 },
 {
  label: 'NHL',
  icon: FaHockeyPuck,
  description: 'National Hockey League'
 },
 // {
 //  label: 'UFC',
 //  icon: GiBoxingGloveSurprise,
 //  description: 'National Basketball Association'
 // },
 {
  label: 'MLS',
  icon: GiSoccerBall,
  description: 'Major League Soccer'
 },
 // {
 //  label: 'WNBA',
 //  icon: FaBasketballBall,
 //  description: 'National Basketball Association'
 // },


]


const SportsList = () => {
 return (
  null
 );
}

export default SportsList;