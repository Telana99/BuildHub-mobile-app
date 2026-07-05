import AsyncStorage from "@react-native-async-storage/async-storage";

// Think of AsyncStorage like localStorage on web
// It stores key-value pairs on the phone permanently
// Even if app is closed, data stays

// Save token and user after login
export const saveAuthData = async (token: string, user: object) => {
  await AsyncStorage.setItem("token", token);
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

// Get token (to send with API requests)
export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

// Get user info
export const getUser = async () => {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Clear on logout
export const clearAuthData = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
};
