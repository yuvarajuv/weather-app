import axios from 'axios';

export async function getCall(url) {
  return await axios.get(url).then(res => res.data);
}
