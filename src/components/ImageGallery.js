// src/ImageGallery.js
import React, { useEffect, useState } from "react";
import "./EventsPage.css";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  
    useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbzXnMP7QPyM_2WawnPSX7QC4YWV9t-STmCw52eOk6n7qURLaoTLeKhx-IQLW9lbNruY/exec")
        .then(res => res.json())
        .then(data => {
        // No conversion logic needed anymore!
        setImages(data);
        console.log("Fetched images successfully.");
        })
        .catch(err => console.error("Error fetching images:", err));
    }, []);

  return (
    <div className="gallery">
      <div className="gallery-scroll">
        {images.map((img, idx) => (
          <div key={idx} className="gallery-item" onClick={() => setSelected(img)}>
            <img src={img.ImageURL} alt={img.Description} />
            <div className="overlay">{img.Description}</div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <div className="lightbox-content">
            <img src={selected.ImageURL} alt={selected.Description} />
            <p className="lightbox-desc">{selected.Description}</p>
          </div>
        </div>
      )}
    </div>
  );
}