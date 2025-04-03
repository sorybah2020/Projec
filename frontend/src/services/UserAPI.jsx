const getUser = async (options) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/profile", {
      ...options,
      credentials: "include", // Ensure cookies are sent
    });

    if (!response.ok) {
      // If response is not successful, throw an error
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw to be handled by caller
  }
};

const logoutUser = async (options) => {
  try {
    console.log("Logging out user");
    const response = await fetch(
      "http://localhost:3000/api/users/logout",
      options
    );

    if (!response.ok) {
      // If response is not successful, throw an error
      throw new Error("Failed to logout user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging out a  user:", error);
    throw error; // Re-throw to be handled by caller
  }
};

const editUser = async (options) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/profile", {
      ...options,
    });

    if (!response.ok) {
      // If response is not successful, throw an error
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw to be handled by caller
  }
};
export default { getUser, logoutUser, editUser };
