import axios from "axios";

const API = axios.create({
  baseURL: "https://api.frankfurter.dev/v2",
});

// ✅ Get all currencies (ARRAY response)
export const fetchCurrencies = async () => {
  const res = await API.get("/currencies");
  return res.data; // returns array
};


// ✅ conversion (ADD THIS HERE)
export const convertCurrency = async (from, to, amount) => {
  const res = await API.get(`/rate/${from}/${to}`);
  const rate = res.data.rate;
  return (amount * rate).toFixed(2);
};