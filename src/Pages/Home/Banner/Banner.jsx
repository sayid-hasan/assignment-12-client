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
  const timeAutoNext = 7000;

  useEffect(() => {
    const initialSliderItems = Array.from(
      document.querySelectorAll(".carousel .list .item")
    );
    const initialThumbnailItems = Array.from(
      document.querySelectorAll(".carousel .thumbnail .item")
    );

    setSliderItems(initialSliderItems);
    setThumbnailItems(initialThumbnailItems);

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
        className={`carousel container mx-auto ${carouselClass}`}
        ref={carouselDom}
      >
        <div className="list" ref={SliderDom}>
          <div className="item">
            <img src="https://i.imgur.com/gmrMjEO.jpg" />
            <div className="content">
              <div className="author">LUNDEV</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">ANIMAL</div>
              <div className="des">
                {/* <!-- lorem 50 --> */}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                sequi, rem magnam nesciunt minima placeat, itaque eum neque
                officiis unde, eaque optio ratione aliquid assumenda facere ab
                et quasi ducimus aut doloribus non numquam. Explicabo,
                laboriosam nisi reprehenderit tempora at laborum natus unde. Ut,
                exercitationem eum aperiam illo illum laudantium?
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
              <div className="author">LUNDEV</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">ANIMAL</div>
              <div className="des">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                sequi, rem magnam nesciunt minima placeat, itaque eum neque
                officiis unde, eaque optio ratione aliquid assumenda facere ab
                et quasi ducimus aut doloribus non numquam. Explicabo,
                laboriosam nisi reprehenderit tempora at laborum natus unde. Ut,
                exercitationem eum aperiam illo illum laudantium?
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="https://i.imgur.com/b00PqxC.jpg" />
            <div className="content">
              <div className="author">LUNDEV</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">ANIMAL</div>
              <div className="des">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                sequi, rem magnam nesciunt minima placeat, itaque eum neque
                officiis unde, eaque optio ratione aliquid assumenda facere ab
                et quasi ducimus aut doloribus non numquam. Explicabo,
                laboriosam nisi reprehenderit tempora at laborum natus unde. Ut,
                exercitationem eum aperiam illo illum laudantium?
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>
        <div className="thumbnail" ref={thumbnailBorderDom}>
          <div className="item">
            <img src="https://i.imgur.com/gmrMjEO.jpg" />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="description">Description</div>
            </div>
          </div>
          <div className="item">
            <img src="https://i.imgur.com/UCKhndt.jpg" />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="description">Description</div>
            </div>
          </div>
          <div className="item">
            <img src="https://i.imgur.com/b00PqxC.jpg" />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="description">Description</div>
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
