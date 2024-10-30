import { deleteCookie } from "cookies-next";

const logout = () => {
  deleteCookie('access');
  deleteCookie('refresh');
};

export default logout;