import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class DiscordService {
  static async UserLogin(code, onSuccess, onError) {
    await axios
      .get(getAPIPath(`discord/token${code}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
<<<<<<< HEAD
<<<<<<< HEAD

  static async UserLogout(onSuccess, onError) {
    await axios
      .get(getAPIPath('discord/logout'), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
=======
>>>>>>> 4d6591f... Finishing user dashboard

  static async GetUserDiscord(onSuccess, onError) {
    await axios
      .get(getAPIPath('discord/user'), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
<<<<<<< HEAD
=======
>>>>>>> 15ebc17... Finishing oauth login flow
=======
>>>>>>> 4d6591f... Finishing user dashboard
}
