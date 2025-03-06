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

const getTransactionsById = async (authId, options) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/get/transactions/${authId}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const getTransaction = async (transactionToEdit, options) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/get/transaction/${transactionToEdit}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
export default { createTransaction, getTransactionsById, getTransaction };
