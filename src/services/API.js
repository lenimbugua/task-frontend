import axios from "axios";
import { baseURL } from "../utils/defined-constants";

export default (url = baseURL) => {
    return axios.create({
        baseURL: url,
    });
};
