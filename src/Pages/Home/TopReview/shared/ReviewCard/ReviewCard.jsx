import { FaQuoteRight } from "react-icons/fa";
import "./reviewCard.css";
import PropTypes from "prop-types";

const ReviewCard = ({ review }) => {
  return (
    <>
      {" "}
      <article className="review">
        <div className="img-container">
          <img src={review?.userImage} alt={name} className="person-img" />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <h4 className="author">{review?.loggedInUserName}</h4>
        <p className="job">{review?.reviewDate}</p>
        <p className="job">{review?.reviewComment}</p>
        <p className="info">{review?.loggedInUserName}</p>
        {/* <div className="button-container">
          <button className="prev-btn" onClick={prevPerson}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextPerson}>
            <FaChevronRight />
          </button>
        </div> */}
      </article>{" "}
    </>
  );
};
ReviewCard.propTypes = {
  review: PropTypes.object,
};

export default ReviewCard;
