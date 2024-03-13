import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";

const ImageCarousel = ({ images }) => {
  return (
    <div>
      {" "}
      <Carousel
        infiniteLoop={true}
        useKeyboardArrows={true}
        showThumbs={false}
        showStatus={false}
      >
        {images.map((image, index) => (
          <div className="slide">
            <img
              alt={image.altText}
              src={image.imgSrc}
              key={image.id}
              style={{ width: "100%", maxWidth: "300px", height: "auto" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
