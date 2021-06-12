import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class BlogService {
  static async CreateBlog(data, onSuccess, onError) {
    await axios
      .post(getAPIPath('blogs'), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetBlogs(page, onSuccess, onError) {
    await axios
      .get(getAPIPath(`blogs?page=${page}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async DeleteBlog(id, onSuccess, onError) {
    await axios
      .delete(getAPIPath(`blogs/${id}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async EditBlog(id, data, onSuccess, onError) {
    await axios
      .put(getAPIPath(`blogs/${id}`), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async GetBlog(id, onSuccess, onError) {
    await axios
      .get(getAPIPath(`blogs/${id}`), { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
