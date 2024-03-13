import { useState } from "react";
import "./App.css";
import { getHotelData } from "./script";
import List from "./components/List";
import ListItem from "./components/ListItem";

function App() {
  const [hotelDetails, setHotelDetails] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [reviewList, setReviewList] = useState({});
  const [isShowReviewEnabled, setIsShowReviewEnabled] = useState(false);

  const onClickLoadHotels = async () => {
    setDataLoading(true);
    const parsedData = await getHotelData();
    setHotelDetails(parsedData);
    setDataLoading(false);
  };

  const getReviews = (hotelId) => {
    if (!isShowReviewEnabled || hotelId !== reviewList.hotel) {
      const reviewDetails = hotelDetails.reviews.find((review) => {
        return review.hotel === hotelId;
      });

      const reviewer = hotelDetails.reviewers.find(
        (reviewer) => reviewer.id === reviewDetails.customer
      );
      setReviewList({ ...reviewDetails, ...{ reviewer } });
      setIsShowReviewEnabled(true);
    } else {
      setIsShowReviewEnabled(false);
      setReviewList({});
    }
  };

  return (
    <div className="container">
      <div className="card">
        <button onClick={onClickLoadHotels}>Load Hotels</button>
      </div>
      <div>
        {dataLoading ? <p>data loading, please wait...</p> : null}
        <List>
          {hotelDetails.hotels?.map((hotel) => {
            const hotelPrice = (
              <>
                {hotel.price.value}
                {hotel.price.symbol}
              </>
            );
            return (
              <>
                <ListItem
                  imageSrc={hotel.images}
                  name={hotel.name}
                  stars={hotel.rating}
                  city={hotel.city}
                  country={hotel.country}
                  price={hotelPrice}
                  duration={`${hotel.startDate} - ${hotel.endDate}`}
                  description={hotel.description}
                  id={hotel.id}
                  getReviews={getReviews}
                  isShowReviewEnabled={hotel.id === reviewList.hotel}
                />
                {hotel.id === reviewList.hotel ? (
                  <div
                    key={reviewList.id}
                    style={{
                      background: "#353535",
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                      marginTop: -32,
                      boxShadow: "5px 5px 30px 2px #e2ece9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 24,
                        padding: "26px 22px",
                      }}
                      className="section"
                    >
                      {/* review icons */}
                      <div
                        style={{
                          margin: 0,
                          padding: 20,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid white",
                            borderRadius: 50,
                            background: "white",
                            color: "black",
                            width: 50,
                            height: 50,
                            fontWeight: "bolder",
                            fontSize: 18,
                          }}
                        >
                          {reviewList.feedback === "positive" ? "+" : "-"}
                        </div>
                      </div>
                      {/* review details */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                        }}
                      >
                        <p
                          style={{
                            alignSelf: "self-start",
                            margin: 0,
                            fontSize: 14,
                            fontWeight: "bolder",
                          }}
                        >
                          {reviewList.reviewer.firstName}{" "}
                          {reviewList.reviewer.lastName}
                        </p>
                        <p
                          style={{
                            alignSelf: "self-start",
                            margin: 0,
                            fontSize: 14,
                          }}
                        >
                          {reviewList.comment.content
                            .map((item) => item.content[0].value)
                            .join(".")}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default App;
