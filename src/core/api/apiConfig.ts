import { useQuery } from '@tanstack/react-query';

const baseURL = process.env.NEXT_APP_SERVER_URL;
  
  export const apiClient = async <T>(
    url: string,
    method: string,
    body: Record<string, unknown>,
  ): Promise<T> => {
  
    const response = await fetch(`${baseURL}${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  
    return response.json();
  };




type FetchDataProps = {
  url: string;
    queryKey: readonly unknown[];
    method: string;
    body?: Record<string, unknown>;
};

export const useFetchData = ({
  url,
  queryKey,
  method,
  body = {}
}: FetchDataProps) => {
  return useQuery({
    queryKey,
    queryFn: () => apiClient(url, method, body),
  });
};