const createUser = async (options) => {
  try {
    // Send user data to the database
    const response = await fetch(
      "http://localhost:3000/api/users/create",
      options
    );
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default {
  createUser,
};
