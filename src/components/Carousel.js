import React, { useState, useEffect } from "react";
import "./Carousel.css";

import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Carousel = ({ people }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 4000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className="carousel">
      {people.map((person, personIndex) => {
        const { char_id, name, occupation, img, nickname } = person;

        let position = "nextSlide";
        if (personIndex === index) {
          position = "activeSlide";
        }
        if (
          personIndex === index - 1 ||
          (index === 0 && personIndex === people.length - 1)
        ) {
          position = "lastSlide";
        }

        return (
          <article className={position} key={char_id}>
            <div className="carousel__left">
              <h2>{name}</h2>
              <p>
                My nickname: <strong>{nickname}</strong>
              </p>
              <div className="carousel__leftOccupations">
                <p>My occupations: </p>
                <ul>
                  {occupation.map((job) => (
                    <li>{job}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="carousel__right">
              <img className="carousel__rightImage" src={img} alt={name} />
            </div>
          </article>
        );
      })}
      <button className="prev" onClick={() => setIndex(index - 1)}>
        <FiChevronLeft />
      </button>
      <button className="next" onClick={() => setIndex(index + 1)}>
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
