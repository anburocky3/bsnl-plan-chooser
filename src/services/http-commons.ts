import { useGlobal } from "@/stores/global.store";
import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://portal2.bsnl.in/myportal/",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
});

// Interceptors to handle 429 - (Many too Request)
apiClient.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  function (error) {
    console.log(error);

    if (error.response.status === 429) {
      const globalStore = useGlobal();

      globalStore.modal.state = true;
      globalStore.modal.title = "Too Many request 😟";
      globalStore.modal.description =
        "We are using free services to run this app which is why you see this error. Please try again after few minutes.";
      // const errMsg = "Too Many request: Please try again after few minutes.";
      // console.log(errMsg, error.response.status);
      // alert(errMsg);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
