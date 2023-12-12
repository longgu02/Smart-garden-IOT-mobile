import axios, { AxiosResponse } from "axios";

const responseBody = (res) => res.data;

export const createClient = (api_root, apiConfig = {}) => {
	return {
		get: (url, config = {}) =>
			axios
				.get(`${api_root}${url}`, { ...config, ...apiConfig })
				.then(responseBody),
		post: (url, config) =>
			axios
				.post(`${api_root}${url}`, { ...config, ...apiConfig })
				.then(responseBody),
		del: (url, config) =>
			axios
				.delete(`${api_root}${url}`, { ...config, ...apiConfig })
				.then(responseBody),
		put: (url, config) =>
			axios
				.put(`${api_root}${url}`, { ...config, ...apiConfig })
				.then(responseBody),
	};
};

export const nextClient = createClient("");

export const testClient = createClient("http://localhost:3001/api");

export const client = createClient("http://localhost:3001/api");
