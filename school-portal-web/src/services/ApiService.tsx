import axios from "axios";
import { ApiResWrapper } from "school-portal-common";
import { env } from "../env";

const apiInstance = axios.create({
  baseURL: env.api.url,
  headers: { 'Content-Type': 'application/json' }
});

export class ApiService {
  async get<T>(url: string) {
    try {
      const { data } = await apiInstance.get<ApiResWrapper<T>>(url);
      return data;
    } catch (err: any) {
      throw err.response.data;
    }
  }

  async post<T>(url: string, req?: Record<string, any>) {
    try {
      const { data } = await apiInstance.post<ApiResWrapper<T>>(url, req);
      return data;
    } catch (err: any) {
      throw err.response.data;
    }
  }
}
