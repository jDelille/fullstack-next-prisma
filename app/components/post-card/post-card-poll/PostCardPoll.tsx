import { useCallback, useState } from 'react';
import styles from './PostCardPoll.module.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import Button from '../../button/Button';
import CheckIcon from '@/app/icons/CheckIcon';

type PostCardPollProps = {
  post: any;
  currentUserId?: string;
  option1Count: number;
  option2Count: number;
};

const PostCardPoll: React.FC<PostCardPollProps> = ({
  post: poll,
  currentUserId,
  option1Count,
  option2Count,
}) => {
  const router = useRouter();

  const [localOption1Count, setLocalOption1Count] = useState(option1Count);
  const [localOption2Count, setLocalOption2Count] = useState(option2Count);

  const [selectedOption, setSelectedOption] = useState<number>()

  const [localVoteCount, setLocalVoteCount] = useState(
    option1Count + option2Count
  );

  const option1Votes = localOption1Count;
  const option2Votes = localOption2Count;
  const totalVotes = option1Votes + option2Votes;

  const option1Width =
    totalVotes !== 0 ? `${((option1Votes / totalVotes) * 100).toFixed(2)}%` : '';
  const option2Width =
    totalVotes !== 0 ? `${((option2Votes / totalVotes) * 100).toFixed(2)}%` : '';

  const onVote = useCallback(
    async (pollId: string) => {
      if (poll.votersIds.includes(currentUserId)) {
        return;
      }

      try {
        await axios.patch(`/api/poll`, {
          pollId,
          selectedOption,
        });

        setLocalVoteCount((prevVoteCount: number) => prevVoteCount + 1);

        if (selectedOption === 1) {
          setLocalOption1Count((prevCount) => prevCount + 1);
        } else {
          setLocalOption2Count((prevCount) => prevCount + 1);
        }

        toast.success('Voted');
        router.refresh();
      } catch (error) {
        toast.error('something went wrong');
      }
    },
    [currentUserId, poll.votersIds, router, selectedOption]
  );

  const mostVotedCount = Math.max(option1Votes, option2Votes);


  const alreadyVoted = () => {
    if (poll.votersIds.includes(currentUserId)) {
      return true;
    }
    return false;
  }

  const option1Style = {
    backgroundColor:
      option1Votes > 0
        ? option1Votes >= mostVotedCount
          ? '#4c5d76'
          : '#384653' // Lighter color if less voted
        : '#4c5d76',
    width: option1Width,
  };

  const option2Style = {
    backgroundColor:
      option2Votes > 0
        ? option2Votes >= mostVotedCount
          ? '#4c5d76'
          : '#384653' // Lighter color if less voted
        : '#4c5d76',
    width: option2Width,
  };


  return (
    <div className={styles.pollContainer}>
      <div className={styles.optionsWrapper}>
        {!alreadyVoted() && (
          <div
            className={selectedOption === 1 ? styles.selectedOptionWrapper : styles.optionWrapper} onClick={(e) => {
              setSelectedOption(1)
              e.stopPropagation();
            }}>
            <div className={styles.optionText}>
              {!alreadyVoted() && (
                <p>{poll.option1}</p>
              )}
              {alreadyVoted() && (
                <>
                  <p>{option1Width}</p>
                  <p>{poll.option1}</p>
                </>
              )}
            </div>
            {/* {currentUserId && alreadyVoted() && (
            <div
              className={option1Votes > option2Votes ? styles.leadingOption : styles.option}
              style={
                option1Style}></div>
          )} */}
          </div>
        )}

        {currentUserId && alreadyVoted() && (
          <div className={styles.votedOptionWrapper}>
            <div className={option1Votes > option2Votes ? styles.leadingOption : styles.votedOption} style={
              option1Style} >
              <div className={styles.vote}>
                <p>{poll.option1}{option1Votes > option2Votes && <CheckIcon />}</p>
              </div>
            </div>
            <div className={styles.percent}>
              <p>{option1Width}</p>
            </div>
          </div>

        )}

        {!alreadyVoted() && (
          <div
            className={selectedOption === 2 ? styles.selectedOptionWrapper : styles.optionWrapper} onClick={(e) => {
              setSelectedOption(2)
              e.stopPropagation();
            }}>
            <div className={styles.optionText}>
              {!alreadyVoted() && (
                <p>{poll.option2}</p>
              )}
              {alreadyVoted() && (
                <>
                  <p>{option2Width}</p>
                  <p>{poll.option2}</p>
                </>
              )}
            </div>
          </div>
        )}

        {currentUserId && alreadyVoted() && (
          <div className={styles.votedOptionWrapper}>
            <div className={option2Votes > option1Votes ? styles.leadingOption : styles.votedOption} style={
              option2Style} >
              <div className={styles.vote}>
                <p>{poll.option2}{option2Votes > option1Votes && <CheckIcon />}</p>
              </div>
            </div>
            <div className={styles.percent}>
              <p>{option2Width}</p>
            </div>
          </div>

        )}

      </div>

      <div className={styles.footer}>
        <div className={styles.expireDate} >
          {!alreadyVoted() && (
            <div className={styles.voteButton}>
              {!selectedOption ? (
                <Button
                  label='Vote'
                  onClick={() => { }}
                  isButtonDisabled={!selectedOption}
                  ariaLabel='Vote button placeholder'
                />
              ) : (
                <button
                  onClick={(e) => { onVote(poll.id); e.stopPropagation() }}
                  className={styles.activeButton}
                  aria-label='Publish poll vote'
                >
                  Vote
                </button>
              )}

            </div>
          )}
          <p>Poll expires in {moment(poll.expiration).fromNow(true)}</p>
          {alreadyVoted() && (
            <>
              <div className={styles.dot}></div>
              <p>you already voted</p>
            </>
          )}
        </div>

        <p>{localVoteCount} votes</p>
      </div>
    </div >
  );
};

export default PostCardPoll;
