import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class DiscordService {
  static async UserLogin(code, onSuccess, onError) {
    await axios
      .get(getAPIPath(`discord/token${code}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async UserLogout(onSuccess, onError) {
    await axios
      .get(getAPIPath('discord/logout'), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetUserDiscord(onSuccess, onError) {
    await axios
      .get(getAPIPath('discord/user'), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async SendWebhook(webhookURL, data, onSuccess, onError) {
    await axios
      .post(webhookURL, data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
