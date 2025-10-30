export interface ApiResponse<T> {
  success: boolean;
  message: string;
  content: {
    data: T;
    meta?: Meta;
    links?: Links;
  };
  status: number;
}

export interface Meta {
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}

export interface Links {
  next: string | null;
  prev: string | null;
}
