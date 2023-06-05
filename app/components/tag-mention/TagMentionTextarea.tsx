import { Mention, MentionsInput, OnChangeHandlerFunc, SuggestionDataItem } from "react-mentions";
import mentionsInputStyle from "../create-post/create-post-textarea/mentionsInputStyle";
import mentionStyle from "../create-post/create-post-textarea/mentionStyle";
import styles from './TagMention.module.scss';
import Image from "next/image";
import VerifiedIcon from "@/app/icons/VerifiedIcon";

type TagMentionTextareaProps = {
 value: string;
 placeholder: string;
 onChange: OnChangeHandlerFunc
 suggestions: any;
 onAdd: (id: string | number, display: string) => void;
 isTextarea: boolean;
}

interface ExtendedSuggestionDataItem extends SuggestionDataItem {
 avatar?: string;
 name?: string;
 isVerified?: boolean;
}

const TagMentionTextarea: React.FC<TagMentionTextareaProps> = ({ value, placeholder, onChange, suggestions, onAdd, isTextarea }) => {
 return (
  <MentionsInput
   value={value}
   placeholder={placeholder}
   onChange={onChange}
   className={styles.textarea}
   style={mentionsInputStyle}
   allowSuggestionsAboveCursor={true}
   a11ySuggestionsListLabel={"Suggested mentions"}
  >
   <Mention
    trigger="@"
    data={suggestions}
    style={mentionStyle}
    onAdd={onAdd}
    appendSpaceOnAdd
    displayTransform={(_, display) => `@${display}`}
    renderSuggestion={(data: ExtendedSuggestionDataItem) => (
     <div className={styles.suggestionBox}>
      <Image src={data.avatar as string || '/images/placeholder.png'} alt='test' width={40} height={40} />
      <div className={styles.suggestionName}>
       <p>{data.name} {data.isVerified && <VerifiedIcon />}</p>
       <p>@{data.display}</p>
      </div>

     </div>
    )}
   />

  </MentionsInput>
 );
}

export default TagMentionTextarea;