import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class BotService {
  static async FindBotsWithGraphs(pageQuery, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/graphs?page=${pageQuery}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async FindBotSearch(bot, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/graphs/${bot}?page=1`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async SearchBot(botName, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/${botName}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
