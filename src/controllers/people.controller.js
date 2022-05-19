const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { buildResponse } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { peopleService } = require('../services');

const createNewPeopleData = catchAsync(async (req, res) => {
  const user = await peopleService.createNewPeople(req.body);
  res.status(httpStatus.CREATED).send(
    buildResponse({
      message: 'People created successfully',
      data: user,
    })
  );
});

const getPeopleData = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['first_name', 'last_name']);
  //   if (filter.title) {
  //     filter.title = { $regex: filter.title };
  //   }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await peopleService.queryPeople(filter, options);
  res.send(
    buildResponse({
      message: 'Get data successfully',
      data: result,
    })
  );
});

const getPeopleDataById = catchAsync(async (req, res) => {
  const item = await peopleService.findDataById(req.params.peopleId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  const data = {
    first_name: item.first_name,
    middle_name: item.middle_name,
    last_name: item.last_name,
    full_name: item.full_name,
    username: item.username,
    gender: item.gender,
    email: item.email,
    profile_picture: item.profile_picture,
    phone_number: item.phone_number,
    birthday: item.birthday,
    address: {
      personal_address: item.personal_address,
      personal_address_country: item.personal_address_country,
      personal_address_country_code: item.personal_address_country_code,
      personal_address_city: item.personal_address_city,
      personal_address_state: item.personal_address_state,
      personal_address_zip_code: item.personal_address_zip_code,
    },
    job: {
      job_description: item.job_description,
      job_type: item.job_type,
      job_title: item.job_title,
    },
    company: {
      company_name: item.company_name,
      company_description: item.company_description,
      company_address: item.company_address,
      company_zip_code: item.company_zip_code,
      company_time_zone: item.company_time_zone,
      company_country: item.company_country,
      company_country_code: item.company_country_code,
    },
  };
  res.send(
    buildResponse({
      message: 'Get data successfully',
      data,
    })
  );
});

module.exports = {
  createNewPeopleData,
  getPeopleData,
  getPeopleDataById,
};
