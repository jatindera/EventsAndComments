import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';


function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);


  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch('/api/comments/' + eventId,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data) {
            setComments(data);
            setIsFetchingComments(false);

          }

        }
        );
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending Comment',
      message: `Sending comment for ${commentData.email}`,
      status: 'pending',
    });
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then(res => res.json())
      .then(data => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: `Successful comment for ${commentData.email}`,
          status: 'success',
        });
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
