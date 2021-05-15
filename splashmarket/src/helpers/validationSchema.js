import * as yup from 'yup';

export const dropletValidationSchema = yup.object().shape({
  company: yup.string().required('Company Name is required.'),
  prize: yup.string().required('Prize is required.'),
  price: yup.string().required('Price is required.'),
  companyDescription: yup.string().required('Company Description is required.'),
  prizeDescription: yup.string().required('Prize Description is required.'),
  fileContents: yup.string().required('Company Logo is required.'),
  webhookURL: yup.string().required('Webhook URL is required.'),
  roleID: yup.string().required('Discord Role ID is required.'),
});

export const addBotValidationSchema = yup.object().shape({
  botName: yup.string().required('Bot Name is required.'),
  tags: yup.array().min(1, 'Bot Tag is required.'),
  fileContents: yup.string().required('Company Logo is required.'),
});

export const guideValidationSchema = yup.object().shape({
  tags: yup.array().min(1, 'Bot Tag is required.'),
  unbindType: yup.string().required('Unbind Type is required.'),
  renewalTypes: yup.array().min(1, 'Renewal Types is required'),
  systemsSupported: yup.string().required('Systems Supported is required.'),
  middleman: yup.string(),
  scammerPrevention: yup.string().required('Scammer Prevention is required.'),
  twitterURL: yup.string(),
  instagramURL: yup.string(),
});

export const blogValidationSchema = yup.object().shape({
  fileContents: yup.string().required('File Contents is required.'),
  botName: yup.string().required('Bot Name is required.'),
  imageURL: yup.string().required('Image URL is required.'),
  headerColor: yup.string().required('Header color is required.'),
  title: yup.string().required('Title is required.'),
  body: yup.string().required('Body is required.'),
});
