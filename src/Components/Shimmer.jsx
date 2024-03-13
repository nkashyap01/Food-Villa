import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";

import React from "react";

const Shimmer = () => {
  return (
    <div className="shimmer-container flex flex-wrap justify-center items-center">
      {[...Array(20)].map((_, index) => (
        <div
          key={index}
          className="shimmer-cards m-2 box-shadow rounded-sm"
        >
          <ShimmerThumbnail height={200} width={250}  />
          <ShimmerTitle
            line={3}
            gap={10}
            variant="secondary"
            className="shimmer-title"
          />
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
