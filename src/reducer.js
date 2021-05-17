const reducer = (state, { type, payload }) => {
  switch (type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "REMOVE_ITEM":
      const filteredCart = state.cart.filter((item) => item.id !== payload);
      return { ...state, cart: filteredCart };

    case "INCREASE":
      let inctempCart = state.cart.map((item) => {
        return item.id === payload
          ? { ...item, amount: item.amount + 1 }
          : item;
      });
      return { ...state, cart: inctempCart };

    case "DECREASE":
      let dectempCart = state.cart
        .map((item) => {
          return item.id === payload
            ? { ...item, amount: item.amount - 1 }
            : item;
        })
        .filter((item) => item.amount > 0);
      return { ...state, cart: dectempCart };

    case "TOTAL_AMOUNT":
      let { amount, total } = state.cart.reduce(
        (acc, { amount, price }) => {
          acc.amount += amount;
          acc.total += amount * price;
          return acc;
        },
        { amount: 0, total: 0 }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, amount, total };

    case "LOADING":
      return { ...state, loading: true };

    case "DISPLAY_CART_ITEMS":
      return { ...state, cart: payload, loading: false };

    default:
        throw new Error("no matching action type");
    //   return state;
  }
};

export default reducer;
