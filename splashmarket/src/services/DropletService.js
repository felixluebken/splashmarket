import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class DropletService {
  static async CreateDroplet(data, onSuccess, onError) {
    await axios
      .post(getAPIPath('droplets'), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
