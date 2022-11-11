import APIManager from "./APIManager";

const handleLogin = async (queryObj) => {
  console.log(queryObj)
  const message = await APIManager.axios
    .post(`/v1/admin/login`, queryObj)
    .then((res) => {
      console.log(res);
      if (res.data.message == "success") {
        localStorage.setItem("token", res.data.token);
        return "Success";
      }
    })
    .catch((err) => {
      console.log(err)
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
