const login = async (options) => {
  try {
    // Send user data to the database
    const response = await fetch(
      "http://localhost:3000/api/users/auth",
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default {
  login,
};
