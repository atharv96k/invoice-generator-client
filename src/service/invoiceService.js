import axios from 'axios';

export const saveInvoice = (baseURL, payload) => {
  return   axios.post(`${baseURL}/invoices`,payload);
}