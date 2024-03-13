import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";

import React from "react";

const RestaurantMenuShimmer = () => {
  return (
    <div className="shimmer-container flex flex-wrap flex-col justify-center items-center">
      <div className="shimmer-cards m-2  rounded-sm">
        <ShimmerThumbnail height={200} width={450} />
      </div>
      {[...Array(8)].map((_, index) => (
        <div key={index} className="shimmer-cards m-2  rounded-sm">
          <ShimmerThumbnail height={50} width={800} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenuShimmer;
