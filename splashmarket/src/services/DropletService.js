import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class DropletService {
  static async CreateDroplet(data, onSuccess, onError) {
    await axios
      .post(getAPIPath('droplets'), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetDroplets(page = 1, onSuccess, onError) {
    await axios
      .get(getAPIPath(`droplets?page=${page}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetDroplet(id, onSuccess, onError) {
    await axios
      .get(getAPIPath(`droplets/${id}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async UpdateDroplet(id, data, onSuccess, onError) {
    await axios
      .put(getAPIPath(`droplets/${id}`), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async DeleteDroplet(id, onSuccess, onError) {
    await axios
      .delete(getAPIPath(`droplets/${id}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
