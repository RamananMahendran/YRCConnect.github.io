import React, { useEffect, useState } from "react";
import "./EventsPage.css";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // 1. Try to load from localStorage cache first for near-instant rendering
    const cachedImages = localStorage.getItem("yrc_gallery_cache");
    if (cachedImages) {
      try {
        setImages(JSON.parse(cachedImages));
      } catch (e) {
        console.error("Failed to parse gallery cache:", e);
      }
    }

    // 2. Fetch fresh data in the background (Stale-While-Revalidate)
    fetch("https://script.google.com/macros/s/AKfycbzXnMP7QPyM_2WawnPSX7QC4YWV9t-STmCw52eOk6n7qURLaoTLeKhx-IQLW9lbNruY/exec")
      .then((res) => {
        if (!res.ok) throw new Error("Network response unstable");
        return res.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setImages(data);
          try {
            localStorage.setItem("yrc_gallery_cache", JSON.stringify(data));
          } catch (e) {
            console.warn("Storage quota exceeded. Gallery caching disabled:", e);
          }
          console.log("Fetched images successfully in background.");
        }
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  // Show shimmer skeleton placeholders during initial load (if cache is empty)
  if (images.length === 0) {
    return (
      <div className="gallery">
        <div className="gallery-scroll">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="gallery-item skeleton">
              <div className="skeleton-image"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="gallery">
      <div className="gallery-scroll">
        {images.map((img, idx) => (
          <div key={idx} className="gallery-item" onClick={() => setSelected(img)}>
            <img src={img.ImageURL} alt={img.Description} loading="lazy" />
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