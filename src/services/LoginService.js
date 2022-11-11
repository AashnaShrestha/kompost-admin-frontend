import APIManager from "./APIManager";

const handleLogin = async (queryObj) => {
  const message = await APIManager.axios
    .post(`/v1/admin/login`, queryObj)
    .then((res) => {
      if (res.data.message == "Success") {
        localStorage.setItem("token", res.data.token);
        return "Success";
      }
    })
    .catch((err) => {
      if (typeof err.response !== "undefined") {
        return err.response.message;
      } else {
        return "Network error";
      }
    });
  return message;
};

export default {
  handleLogin,
};
