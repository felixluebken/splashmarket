import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class UserService {
  static async FindUsersWithMostTransactions(onSuccess, onError) {
    await axios
      .get(getAPIPath('user/transactions/top'), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
