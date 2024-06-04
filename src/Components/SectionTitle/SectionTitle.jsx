import PropTypes from "prop-types";

const SectionTitle = ({ subheading, heading }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className={`w-full md:w-1/2 mx-auto`}>
        <p className="text-[#D99904]  mb-2 md:mb-10 font-Cinzel font-normal text-base md:text-xl text-center">
          {subheading}
        </p>
        <h2 className=" font-Cinzel py-4  uppercase font-normal border-y-2 border-[#E8E8E8] text-2xl md:text-4xl leading-[48px] text-center mb-4 md:mb-9">
          {heading}
        </h2>
      </div>
    </div>
  );
};
SectionTitle.propTypes = {
  subheading: PropTypes.node,
  heading: PropTypes.node,
  width: PropTypes.node,
};

export default SectionTitle;
