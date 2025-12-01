export type CommonOptions = {
  value: number | string | boolean;
  label: string;
};

export type FilterType = {
  key: string;
  label: string;
  options: CommonOptions[];
};

export type PaginationType = {
  totalData: number;
  currentPage: number;
  totalPages: number;
  limit: number;
};

export type APIResponse<T = void> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
  details?: string[];
  pagination?: PaginationType;
} | null;

export type FetchCallback<T> = {
  onSuccess: (data: T) => void;
  onError: (errMessage: string) => void;
  onFullfilled?: () => void;
};

export type DataWithPagination<T> = {
  data: T;
  pagination: PaginationType;
};

export type FetchParams = {
  params: {
    [key: string]: string | number;
  };
};
