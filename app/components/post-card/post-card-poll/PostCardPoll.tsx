import { useCallback, useState } from 'react';
import styles from './PostCardPoll.module.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import moment from 'moment';


type PostCardPollProps = {
 post: any;
 currentUserId?: string;
 option1Count: number
 option2Count: number
};

const PostCardPoll: React.FC<PostCardPollProps> = ({ post: poll, currentUserId, option1Count, option2Count }) => {
 const router = useRouter();

 const [localOption1Count, setLocalOption1Count] = useState(option1Count)
 const [localOption2Count, setLocalOption2Count] = useState(option2Count)

 const [localVoteCount, setLocalVoteCount] = useState(option1Count + option2Count)


 const option1Votes = localOption1Count;
 const option2Votes = localOption2Count;
 const totalVotes = option1Votes + option2Votes;



 const option1Width = totalVotes !== 0 ? `${(option1Votes / totalVotes) * 100}%` : '';
 const option2Width =
  totalVotes !== 0 ? `${(option2Votes / totalVotes) * 100}%` : '';


 const onVote = useCallback(async (pollId: string, vote: number) => {

  if (poll.votersIds.includes(currentUserId)) {
   return;
  }

  try {
   await axios.patch(`/api/poll`, {
    pollId,
    vote,
   });

   setLocalVoteCount((prevVoteCount: number) => prevVoteCount + 1);

   if (vote === 1) {
    setLocalOption1Count((prevCount) => prevCount + 1);
   } else {
    setLocalOption2Count((prevCount) => prevCount + 1);
   }

   toast.success('Voted');
   router.refresh();
  } catch (error) {
   toast.error('something went wrong');
  }
 }, [currentUserId, poll.votersIds, router])

 return (
  <div className={styles.pollContainer}>
   <div className={styles.optionsWrapper}>
    <div className={styles.optionWrapper} onClick={(e) => { onVote(poll.id, 1); e.stopPropagation() }}>
     <div
      className={styles.option}
      style={option1Votes > 0 ? { backgroundColor: '#20b46a', width: option1Width } : { backgroundColor: '#1a222c', width: '0px' }}
     >
      <p>{poll.option1}</p>

     </div>
     <div className={styles.pollVotes}>
      {poll.option1Votes && (
       <span>{option1Votes}</span>
      )}
     </div>

    </div>
    <div className={styles.optionWrapper} onClick={(e) => { onVote(poll.id, 2); e.stopPropagation() }}>
     <div
      className={styles.option}
      style={option2Votes > 0 ? { backgroundColor: '#20b46a', width: option2Width } : { backgroundColor: '#1a222c', width: '0px' }} >
      <p>{poll.option2}</p>

     </div>
     <div className={styles.pollVotes}>
      {poll.option2Votes && (
       <span>{option2Votes}</span>
      )}
     </div>
    </div>
   </div>
   <div className={styles.expireDate}>
    <p>
     Poll expires in{' '}
     {moment(poll.expiration).fromNow(true)}
    </p>
    <p>Total votes: {localVoteCount}</p>
   </div>
  </div>
 );
}

export default PostCardPoll;