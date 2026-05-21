import React, { useState, useEffect } from "react";
import "./Carousel.css";

const images = [
  "/images/image.png"
]; // replace with your actual image paths

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

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
      <button className="carousel-btn prev" onClick={() => goToSlide((current - 1 + images.length) % images.length)}>
        ❮
      </button>
      <button className="carousel-btn next" onClick={() => goToSlide((current + 1) % images.length)}>
        ❯
      </button>
    </div>
  );
}
