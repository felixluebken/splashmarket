import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class BotService {
  static async FindBotsWithGraphs(onSuccess, onError) {
    await axios
      .get(getAPIPath('bots/graphs'), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
