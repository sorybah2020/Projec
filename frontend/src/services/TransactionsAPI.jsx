const createTransaction = async (options) => {
  try {
    // You're missing the await keyword here
    const response = await fetch(
      "http://localhost:3000/api/transaction/create",
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
export default { createTransaction };
