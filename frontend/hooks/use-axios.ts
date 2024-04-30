import { useAuth } from "@/providers/auth";
import { baseUrls } from "@/utils/base-urls";
import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useAuth();

  const axiosInstance = axios.create({
    baseURL: baseUrls.auth,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseUrls.auth}/token/refresh/`, {
      refresh: authTokens.refresh,
    });
    localStorage.setItem("authTokens", JSON.stringify(response.data));
    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwtDecode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
