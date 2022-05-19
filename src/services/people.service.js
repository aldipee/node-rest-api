const { clearKey } = require('../utils/redisClient');
const { People } = require('../models');

const createNewPeople = async (personData) => {
  clearKey(People.collection.collectionName);
  return People.create(personData);
};

const queryPeople = async (filter, options) => {
  const Peoples = await People.paginate(
    filter,
    options,
    `-first_name 
    -middle_name 
    -last_name 
    -personal_address 
    -personal_address_city 
    -personal_address_state 
    -personal_address_zip_code 
    -job_description 
    -job_type 
    -phone_number 
    -company_description 
    -company_address 
    -company_zip_code 
    -company_time_zone 
    -birthday
    -updated_at
    -created_at
    `,
    true
  );
  return Peoples;
};

const findDataById = async (id) => {
  return People.findById(id).cache();
};

module.exports = {
  createNewPeople,
  queryPeople,
  findDataById,
};
