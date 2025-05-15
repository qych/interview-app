export interface ApiResWrapper<T = null> {
  data: T;
  error?: string;
}
