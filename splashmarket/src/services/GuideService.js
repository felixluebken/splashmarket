import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class GuideService {
  static async CreateBotGuide(data, onSuccess, onError) {
    await axios
      .post(getAPIPath('guides'), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetBotGuides(page, onSuccess, onError) {
    await axios
      .get(getAPIPath(`guides?page=${page}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async FindBotGuide(bot, onSuccess, onError) {
    await axios
      .get(getAPIPath(`guides/bots/${bot}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async FindBotGuides(bot, onSuccess, onError) {
    await axios
      .get(getAPIPath(`guides/${bot}?page=1`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async FindBotGuidesWithFilter(bot, filter, page = 1, onSuccess, onError) {
    await axios
      .get(getAPIPath(`guides/${bot || 'all'}?page=${page}&filter=${filter || null}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
