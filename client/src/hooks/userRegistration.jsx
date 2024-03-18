import axios from 'axios';

async function registerUser(name, email, password, role) {
  try {
    const response = await axios.post('http://localhost:4000/api/users/register', {
      name,
      email,
      password,
      role,
    });
    console.log(response.data);
    // Assuming you want to return the response data or a success message
    return response.data; // or return { success: true, message: "User registered successfully" };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of  2xx
      console.error('Error response:', error.response.status);
      console.error('Error data:', error.response.data);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    // You can decide how to handle these errors further, e.g., by throwing them or sending them back to the client
    throw error; // This will propagate the error upwards
  }
}

export { registerUser };
