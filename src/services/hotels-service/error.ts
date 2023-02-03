function notFound(message: string) {
  return {
    name: "NotFoundError", 
    message
  };
}

function paymentRequired() {
  return {
    name: "paymentRequired", 
    message: "Payment is required."
  };
}

const hotelErrors = {
  notFound,
  paymentRequired
};

export default hotelErrors;
