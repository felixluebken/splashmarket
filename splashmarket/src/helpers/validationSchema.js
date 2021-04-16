import * as yup from 'yup';

export const dropletValidationSchema = yup.object().shape({
  company: yup.string().required('Company Name is required.'),
  prize: yup.string().required('Prize is required.'),
  price: yup.string().required('Price is required.'),
  companyDescription: yup.string().required('Company Description is required.'),
  prizeDescription: yup.string().required('Prize Description is required.'),
  fileContents: yup.string().required('Company Logo is required.'),
  roleID: yup.string().required('Discord Role ID is required.'),
  webhookURL: yup.string().required('Webhook URL is required.'),
});

export const test = () => {

};
