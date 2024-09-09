import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import "./banner.css";
import { useEffect, useRef, useState } from "react";

const Banner = () => {
  const [sliderItems, setSliderItems] = useState([]);
  const [thumbnailItems, setThumbnailItems] = useState([]);
  const [carouselClass, setCarouselClass] = useState("");

  const runTimeOutRef = useRef(null);
  const runNextAutoRef = useRef(null);
  const SliderDom = useRef(null);
  const thumbnailBorderDom = useRef(null);
  const nextDom = useRef(null);
  const prevDom = useRef(null);
  const carouselDom = useRef(null);

  const timeRunning = 3000;
  const timeAutoNext = 10000;

  useEffect(() => {
    const initialSliderItems = Array.from(
      document.querySelectorAll(".carousel .list .item")
    );
    const initialThumbnailItems = Array.from(
      document.querySelectorAll(".carousel .thumbnail .item")
    );

    setSliderItems(initialSliderItems);
    setThumbnailItems(initialThumbnailItems);
    SliderDom.current.appendChild(initialSliderItems[0]);
    thumbnailBorderDom.current.appendChild(initialThumbnailItems[0]);

    runNextAutoRef.current = setTimeout(() => {
      nextDom.current.click();
    }, timeAutoNext);

    return () => {
      clearTimeout(runNextAutoRef.current);
      clearTimeout(runTimeOutRef.current);
    };
  }, []);

  const showSlider = (type) => {
    const SliderItems = Array.from(
      SliderDom.current.querySelectorAll(".carousel .list .item")
    );
    const thumbnailItems = Array.from(
      document.querySelectorAll(".carousel .thumbnail .item")
    );
    if (type === "next") {
      SliderDom.current.appendChild(SliderItems[0]);
      thumbnailBorderDom.current.appendChild(thumbnailItems[0]);
      setCarouselClass("next");
    } else {
      SliderDom.current.prepend(SliderItems[SliderItems.length - 1]);
      thumbnailBorderDom.current.prepend(
        thumbnailItems[thumbnailItems.length - 1]
      );
      setCarouselClass("prev");
    }

    clearTimeout(runTimeOutRef.current);
    runTimeOutRef.current = setTimeout(() => {
      setCarouselClass("");
    }, timeRunning);

    clearTimeout(runNextAutoRef.current);
    runNextAutoRef.current = setTimeout(() => {
      nextDom.current.click();
    }, timeAutoNext);
  };

  const handleNext = () => {
    showSlider("next");
  };

  const handlePrev = () => {
    showSlider("prev");
  };
  return (
    <>
      {/* // <!-- carousel --> */}
      <div
        className={`carousel relative container mx-auto ${carouselClass}`}
        ref={carouselDom}
      >
        <div className="list" ref={SliderDom}>
          <div className="item">
            <img src="https://i.imgur.com/gmrMjEO.jpg" />
            <div className="content">
              <div className="author">Excellence Rewarded</div>
              <div className="title">
                Unlock Your Future with Merit-based Scholarships
              </div>
              <div className="topic">Merit Scholarships</div>
              <div className="des">
                {/* <!-- lorem 50 --> */}
                Discover a world of opportunities with our comprehensive list of
                merit-based scholarships. Whether you&#39;re aiming for top
                universities like Harvard or seeking specialized programs, we
                provide the guidance and support you need to turn your academic
                dreams into reality. Learn how your hard work and dedication can
                open doors to prestigious institutions worldwide.
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="https://i.imgur.com/UCKhndt.jpg" />
            <div className="content">
              <div className="author">Financial Aid for All</div>
              <div className="title">
                Breaking Barriers with Need-based Scholarships
              </div>
              <div className="topic">Need Scholarships</div>
              <div className="des">
                Don&#39;t let financial constraints hold you back. Explore our
                extensive range of need-based scholarships designed to support
                outstanding students from all backgrounds. Institutions like the
                University of Oxford offer substantial aid to ensure that
                everyone has the chance to succeed, regardless of their
                financial situation. Start your journey to academic success
                today.
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="https://i.imgur.com/73WLZZ1.jpg" />
            <div className="content">
              <div className="author">Study Anywhere</div>
              <div className="title">
                Global Opportunities with International Scholarships
              </div>
              <div className="topic">International Aid</div>
              <div className="des">
                Broaden your horizons and gain global experience with
                international scholarships. From the University of Toronto to
                the Australian National University, numerous programs offer full
                financial support to international students. Embrace the chance
                to study in diverse cultures and make lifelong connections while
                earning a world-class education. Discover your path to
                international success.
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>
        <div className="thumbnail " ref={thumbnailBorderDom}>
          <div className="item">
            <img src="https://i.imgur.com/gmrMjEO.jpg" />
            <div className="content">
              <div className="title">Excellence Rewarded</div>
              <div className="description">Merit Scholarship</div>
            </div>
          </div>
          <div className="item">
            <img src="https://i.imgur.com/UCKhndt.jpg" />
            <div className="content">
              <div className="title">Financial Aid for All</div>
              <div className="description">Need Scholarships</div>
            </div>
          </div>
          <div className="item">
            <img src="https://i.imgur.com/73WLZZ1.jpg" />
            <div className="content">
              <div className="title">Study Anywhere</div>
              <div className="description">International Aid</div>
            </div>
          </div>
        </div>
        <div className="arrows">
          <button id="prev" onClick={handlePrev}>
            <MdArrowLeft className="text-7xl" />
          </button>
          <button id="next" onClick={handleNext} ref={nextDom}>
            <MdArrowRight className="text-7xl" />
          </button>
        </div>
        <div className="time"></div>
      </div>
    </>
  );
};

export default Banner;
