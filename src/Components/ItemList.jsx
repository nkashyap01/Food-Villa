import React from "react";
import ItemListCard from "./ItemListCard";

const ItemList = ({ items }) => {
  return (
    <div className="flex w-full items-center flex-col">
      {items.map((item) => (
        <ItemListCard item={item} />
      ))}
    </div>
  );
};

export default ItemList;
