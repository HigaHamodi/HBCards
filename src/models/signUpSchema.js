import Joi from "joi";

const signUpSchema = {
  first: {
    label: "First Name",
    schema: Joi.string().min(2).max(250).required(),
  },
  last: {
    label: "Last Name",
    schema: Joi.string().min(2).max(250).required(),
  },
  middle: {
    label: "Middle Name",
    schema: Joi.string().min(2).max(250).allow(""),
  },
  phone: {
    label: "Phone",
    schema: Joi.string()
      .pattern(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
      .message("Please enter a valid phone number")
      .required(),
  },
  email: {
    label: "Email Address",
    schema: Joi.string()
      .pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      .message('user "mail" must be a valid mail')
      .required(),
  },
  password: {
    label: "Password",
    schema: Joi.string()
      .pattern(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
      )
      .message(
        "password: 7<=<20 chars, >=1 uppercase, >=1 lowercase, >=1 number, >=1 from !@#$%^&*-"
      )
      .required(),
  },
  url: {
    label: "Url",
    schema: Joi.string()
      .regex(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
      .message("user image must be a valid url")
      .allow(""),
  },
  alt: {
    label: "Alt",
    schema: Joi.string().min(2).max(256).allow(""),
  },
  state: {
    label: "State",
    schema: Joi.string().allow(""),
  },
  country: {
    label: "Country",
    schema: Joi.string().min(2).max(256).required(),
  },
  city: {
    label: "City",
    schema: Joi.string().min(2).max(256).required(),
  },
  street: {
    label: "Street",
    schema: Joi.string().min(2).max(256).required(),
  },
  houseNumber: {
    label: "House Number",
    schema: Joi.number().required(),
  },
  zip: {
    label: "Zip",
    schema: Joi.number(),
  },
  isBusiness: {
    label: "Business Account",
    schema: Joi.boolean().required(),
  },
};

export default signUpSchema;
