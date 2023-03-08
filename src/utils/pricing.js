export function setPricing(rating) {
  let price = 0;
  if (rating < 1) return price;

  if (rating <= 3) {
    price += 3500;
  } else if (rating <= 6) {
    price += 8250;
  } else if (rating <= 8) {
    price += 16350;
  } else if (rating <= 10) {
    price += 21250;
  }
  return price;
}
