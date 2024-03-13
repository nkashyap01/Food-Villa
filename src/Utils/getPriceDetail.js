import { useEffect } from "react";
import { useSelector } from "react-redux";

const useGetValue = () => {
  const cartItems = useSelector((store) => store.item.cartItems);

  const getValues = () => {
    let total = cartItems.reduce((total, item) => {
      return (
        total +
        (item.card.info.price
          ? item.card.info.price / 100
          : item.card.info.defaultPrice / 100)
      );
    }, 0);

    let discount = 0;
    let deliveryCharge = 0;

    if (total < 100) {
      discount = 0;
      deliveryCharge = 0;
    } else if (total > 100 && total <= 300) {
      discount = (total * 10) / 100;
      deliveryCharge = 40;
    } else if (total > 300 && total <= 500) {
      discount = (total * 20) / 100;
      deliveryCharge = 80;
    } else {
      discount = (total * 30) / 100;
      deliveryCharge = 120;
    }

    return [total, discount, deliveryCharge];
  };

  useEffect(() => {
    getValues();
  }, []);

  return getValues();
};

export default useGetValue;
