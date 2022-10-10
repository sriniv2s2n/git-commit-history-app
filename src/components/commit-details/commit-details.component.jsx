import moment from "moment";
import "./commit-details.styles.scss";

const CommitDetails = ({ message, author, time }) => {
  return (
    <div className="commit-details-container">
      <div className="commit-main">📝 {message}</div>
      <div className="commit-footer">
        <div className="time">
          ⏰ {moment(new Date(time)).format("MMMM DD, YYYY, h:mma")}
        </div>
        <div className="author">👨🏽‍💻 {author}</div>
      </div>
    </div>
  );
};

export default CommitDetails;
