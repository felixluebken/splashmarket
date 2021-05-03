import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class UserService {
  static async FindUsersWithMostTransactions(onSuccess, onError) {
    await axios
      .get(getAPIPath('user/transactions/top'), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async FindUserSearch(params, onSuccess, onError) {
    await axios
      .get(getAPIPath('user/search'), { params }, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async UpdateUser(id, data, onSuccess, onError) {
    await axios
      .put(getAPIPath(`user/${id}`), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetUser(id, onSuccess, onError) {
    await axios
      .get(getAPIPath(`user/${id}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
