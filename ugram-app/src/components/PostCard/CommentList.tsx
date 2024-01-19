import { Comment, PostProfile } from '../../types/Post';
import { CommentItem } from './CommentItem';

type CommentListProps = {
  comments?: Comment[];
  commenters: PostProfile[];
  maxNumberOfComments?: number;
  isModal?: boolean;
};

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  commenters,
  isModal = false,
  maxNumberOfComments = 3,
}) => {
  function getCommenter(id: string) {
    return commenters.find((c) => c.userId == id);
  }

  function getFilteredComments() {
    if (!comments) return [];
    const sortedComments = comments.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return isModal ? sortedComments : sortedComments?.slice(0, maxNumberOfComments);
  }

  return (
    <>
      {getFilteredComments().map((comment) => (
        <CommentItem
          key={comment.id}
          text={comment.text}
          profilePicture={
            isModal ? getCommenter(comment.userId)?.profilePicture : undefined
          }
          username={getCommenter(comment.userId)?.username}
          createdAt={isModal ? comment.createdAt : undefined}
          userId={comment.userId}
          showAvatar={isModal}
        />
      ))}
    </>
  );
};
