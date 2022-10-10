import "./commit-details.styles.scss";

const CommitDetails = ({ message, author, time }) => {
  return (
    <div className="commit-details-container">
      <div className="commit-main">📝 {message}</div>
      <div className="commit-footer">
        <div className="time">⏰ {time}</div>
        <div className="author">👨🏽‍💻 {author}</div>
      </div>
    </div>
  );
};

export default CommitDetails;
