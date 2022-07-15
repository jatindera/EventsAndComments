import classes from './comment-list.module.css';

function CommentList(props) {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {
        items.map(item => (
          <li key={item._id}>
            <span>{item.comment} - <i><small>{item.name}</small></i></span>
          </li>
        ))
      }
    </ul>
  );
}

export default CommentList;


