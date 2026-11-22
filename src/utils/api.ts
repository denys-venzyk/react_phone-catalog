import { Product } from '../types/Product';

const API_URL = '/api';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function get<T>(url: string): Promise<T> {
  const fullURL = API_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => {
      if (!res.ok) {
        throw new Error('Unable to load');
      }

      return res.json();
    });
}

export const getProducts = () => get<Product[]>('/products');
