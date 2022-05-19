const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNewPeople = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    full_name: Joi.string().required(),
    middle_name: Joi.string(),
    birthday: Joi.string(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    gender: Joi.string().required(),
    email: Joi.string().required(),
    profile_picture: Joi.string().required(),
    personal_address: Joi.string().required(),
    personal_address_country: Joi.string().required(),
    personal_address_country_code: Joi.string().required(),
    personal_address_city: Joi.string().required(),
    personal_address_state: Joi.string().required(),
    personal_address_zip_code: Joi.string().required(),
    job_title: Joi.string().required(),
    job_description: Joi.string().required(),
    job_type: Joi.string().required(),
    phone_number: Joi.string().required(),
    company_name: Joi.string().required(),
    company_description: Joi.string().required(),
    company_address: Joi.string().required(),
    company_country: Joi.string().required(),
    company_country_code: Joi.string().required(),
    company_zip_code: Joi.string().required(),
    company_time_zone: Joi.string().required(),
  }),
};

const getPeopleById = {
  params: Joi.object().keys({
    peopleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNewPeople,
  getPeopleById,
};
