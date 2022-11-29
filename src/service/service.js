import axios from "axios";

const base_url = "http://172.30.208.1:8083/api/v1/";

export const login = (body) => {
  const formData = new FormData();
  formData.append("username", body.username);
  formData.append("password", body.password);
  return axios.post(`${base_url}user/login`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    validateStatus: (status) => status <= 500,
  });
};

export const register = (body) => {
  return axios.post(
    `${base_url}user/new/shipper`,
    {
      ...body,
      streetNumber: body.address.split(" ")[0],
      address: body.address.split(" ").slice(1).join(" "),
      rolesNames: ["Shipper"],
    },
    {
      validateStatus: (status) => status < 500,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getMedicalShop = (id, token) =>
  axios.get(`${base_url}medical-shop/${id}`, {
    validateStatus: (status) => status < 500,
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getItem = (id, token) =>
  axios.get(`${base_url}goods/${id}`, {
    validateStatus: (status) => status < 500,
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getUserInfo = (id, token) =>
  axios.get(`${base_url}user/${id}`, {
    validateStatus: (status) => status < 500,
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getNotifications = (id, token) =>
  axios.get(`${base_url}notification/list/${id}`, {
    validateStatus: (status) => status < 500,
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getBills = (id, token) => {
  return axios.get(`${base_url}bill/detail/shipper/${id}`, {
    validateStatus: (status) => status < 500,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getBillDetail = (id, token) =>
  axios.get(`${base_url}bill/${id}`, {
    validateStatus: (status) => status < 500,
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getRating = (id, token) =>
  axios.get(`${base_url}rating/list/shipper//${id}`, {
    validateStatus: (status) => status < 500,
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateBill = (billId, token) =>
  axios.put(`${base_url}bill/delivered/${billId}`, null, {
    validateStatus: (status) => status < 500,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const updateUserLocation = (id, body, token) => {
  const formData = new FormData();
  formData.append("userDTO", JSON.stringify(body));
  return axios.put(`${base_url}/user/update`, formData, {
    validateStatus: (status) => status < 500,
    Authorization: `Bearer ${token}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
