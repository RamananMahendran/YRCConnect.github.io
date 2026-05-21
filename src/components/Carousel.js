import React, { useState, useEffect } from "react";
import "./Carousel.css";

const originalImages = [
  process.env.PUBLIC_URL + "/images/Image1.JPG",
  process.env.PUBLIC_URL + "/images/Image2.jpg",
  process.env.PUBLIC_URL + "/images/Image3.jpg",
  process.env.PUBLIC_URL + "/images/Image4.JPG",
  process.env.PUBLIC_URL + "/images/Image5.JPG",
  process.env.PUBLIC_URL + "/images/Image6.JPG",
  process.env.PUBLIC_URL + "/images/Image9.jpg",
  process.env.PUBLIC_URL + "/images/Image10.jpg"
];

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  // Shuffle once on mount
  useEffect(() => {
    setImages(shuffleArray(originalImages));
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  if (images.length === 0) return null;

  return (
    <div className="carousel">
      <img src={images[current]} alt={`Slide ${current}`} className="carousel-image" />

      {/* Navigation dots */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>

      {/* Prev/Next buttons */}
      <button
        className="carousel-btn prev"
        onClick={() => goToSlide((current - 1 + images.length) % images.length)}
      >
        ❮
      </button>
      <button
        className="carousel-btn next"
        onClick={() => goToSlide((current + 1) % images.length)}
      >
        ❯
      </button>
    </div>
  );
}
