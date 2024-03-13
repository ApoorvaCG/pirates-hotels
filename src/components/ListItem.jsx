import React from "react";
import Rate from "rc-rate";
import ImageCarousel from "./Carousel";

const ListItem = ({
  imageSrc,
  name,
  price,
  stars,
  city,
  country,
  description,
  duration,
  id,
  getReviews,
  isShowReviewEnabled,
}) => {
  return (
    <li
      style={{
        display: "flex",
        gap: 24,
        alignItems: "center",
        borderRadius: 8,
        boxShadow: "5px 5px 30px 2px #e2ece9",
      }}
      className="card"
    >
      {/* hotel image */}
      <div style={{ width: "30%" }}>
        <ImageCarousel images={imageSrc} />
      </div>
      {/* hotel details */}
      <div style={{ width: "70%" }}>
        {/* title */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>{name}</div>
            <div className="text" style={{ display: "flex" }}>
              {city},{country}
            </div>
          </div>
          <div>
            {stars && (
              <div>
                Stars: {stars}
                {/* <Rate value={stars} allowHalf disabled /> */}
                {/* Assuming stars is a number indicating the rating */}
              </div>
            )}
          </div>
        </div>
        {/* description */}
        <div style={{ display: "flex", margin: "20px 0px" }}>{description}</div>
        {/* review n price */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button style={{ alignSelf: "end" }} onClick={() => getReviews(id)}>
            {isShowReviewEnabled ? "Hide Reviews" : "Show Reviews"}
          </button>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div className="price">{price}</div>
            <div className="text">{duration}</div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default ListItem;
