import axios from 'axios';
import getAPIPath from '../helpers/urlGenerator';

export default class StripeService {
  static async CreateCheckoutSession(data, onSuccess, onError) {
    await axios
      .post(getAPIPath('stripe/create-checkout-session'), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static async CreatePortalSession(data, onSuccess, onError) {
    await axios
      .post(getAPIPath('stripe/customer-portal'), data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
