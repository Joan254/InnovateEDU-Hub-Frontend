import axios from 'axios';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode'; // Ensure jwtDecode is imported correctly

const fetchUserDetails = async () => {
  try {
    const token = getCookie('access'); // Ensure you’re fetching the correct cookie

    if (!token) {
      throw new Error('Authentication token not found');
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;

    const response = await axios.get(
      `http://127.0.0.1:8000/api/accounts/user/${userId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      }
    );

    if (response.data.success) {
      return response.data.user_info;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return { success: false, message: error.message || 'Error fetching user details' };
  }
};

export default fetchUserDetails;
