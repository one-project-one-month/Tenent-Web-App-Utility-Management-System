export interface ApiResponse<T> {
  success: boolean;
  message: string;
  content: T;
  status: number;
}