import { TIME_OUT_SEC } from "./config.js";

const timeout = function (TIME_OUT_SEC) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long, Please try Again!`));
    }, TIME_OUT_SEC * 1000);
  });
};

export const getJson = async function (API_URL, errMessage) {
  try {
    const res = await Promise.race([timeout(TIME_OUT_SEC), fetch(API_URL)]);

    if (!res.ok) throw new Error(`${errMessage}`);

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
