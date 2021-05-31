import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class BotService {
  static async FindBotsWithGraphs(pageQuery, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/graphs?page=${pageQuery}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async FindBotSearch(bot, sort, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/graphs/sort?bot=${bot}&page=1&sort=${sort}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async SearchBot(botName, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/${botName}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async SearchAdminBot(botName, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/admin/${botName}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async FindAdminBotSearch(bot, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/admin/search/${bot}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetSales(botName, query, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/sales/${botName}?timeframe=${query || '1wk'}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetAllBots(onSuccess, onError) {
    await axios
      .get(getAPIPath('bots'), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetAllAdminBots(pageQuery, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/admin/all?page=${pageQuery}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async CreateAdminBot(data, onSuccess, onError) {
    await axios
      .post(getAPIPath('bots/admin/create'), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async EditAdminBot(id, data, onSuccess, onError) {
    await axios
      .put(getAPIPath(`bots/admin/${id}`), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetAdminBot(id, onSuccess, onError) {
    await axios
      .get(getAPIPath(`bots/admin/${id}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async DeleteAdminBot(id, onSuccess, onError) {
    await axios
      .delete(getAPIPath(`bots/admin/${id}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
