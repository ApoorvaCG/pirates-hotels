const API_CONSTANTS = {
  spaceID: "gyfunrv4a4ak",
  accessToken: "k9P9FQJcUpHKrHX3tXrgXunRyiS3qPchtY7V61tNruE",
  environmentID: "master",
};
const API_BASE_URL = "https://cdn.contentful.com/"; ///spaces/gyfunrv4a4ak/environments/master/entries?access_token=k9P9FQJcUpHKrHX3tXrgXunRyiS3qPchtY7V61tNruE

const getHotelData = () => {
  let myObjectWithHotelsAndReviews = {
    reviews: [],
    hotels: [],
    reviewers: [],
    images: [],
  };

  return fetch(
    `${API_BASE_URL}/spaces/${API_CONSTANTS.spaceID}/environments/${API_CONSTANTS.environmentID}/entries?access_token=${API_CONSTANTS.accessToken}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const images = data.includes.Asset || [];
      if (images.length) {
        let imageData = images.map((image) => {
          return {
            id: image.sys.id,
            imgSrc: `https:${image.fields.file.url}`,
            altText: image.fields.title,
          };
        });
        myObjectWithHotelsAndReviews = {
          ...myObjectWithHotelsAndReviews,
          images: [...myObjectWithHotelsAndReviews.images, ...imageData],
        };
      }
      data.items.map((item) => {
        const details = item.fields;

        if (details.title) {
          details.hotel = details.hotel.sys.id;
          details.customer = details.customer.sys.id;
          // details.comment =
          myObjectWithHotelsAndReviews = {
            ...myObjectWithHotelsAndReviews,
            reviews: [...myObjectWithHotelsAndReviews.reviews, details],
          };
        }
        if (details.name) {
          details.id = item.sys.id;
          details.startDate = new Date(details.startDate).toLocaleDateString(
            "de-DE"
          );
          details.endDate = new Date(details.endDate).toLocaleDateString(
            "de-DE"
          );

          details.images = myObjectWithHotelsAndReviews.images.filter(
            (imageAsset) =>
              details.images.find((image) => {
                return imageAsset.id == image.sys.id;
              })
          );
          details.description = details.description.content
            .map((item) => item.content[0].value)
            .join(".");
          myObjectWithHotelsAndReviews = {
            ...myObjectWithHotelsAndReviews,
            hotels: [...myObjectWithHotelsAndReviews.hotels, details],
          };
        }
        if (details.firstName) {
          details.id = item.sys.id;

          myObjectWithHotelsAndReviews = {
            ...myObjectWithHotelsAndReviews,
            reviewers: [...myObjectWithHotelsAndReviews.reviewers, details],
          };
        }
      });
      return myObjectWithHotelsAndReviews;
    })
    .catch((error) => {
      console.log(":::: fetch error ::::", error);
    });
};

/* 
    {hotelsList:[], reviews:[], etc}

*/
export { getHotelData };
