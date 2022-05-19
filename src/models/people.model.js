const { mongoose } = require('../utils/redisClient');
const { toJSON, paginate } = require('./plugins');

const peopleSchema = mongoose.Schema(
  {
    first_name: {
      type: 'String',
      required: true,
      trim: true,
    },
    full_name: {
      type: 'String',
      required: true,
      trim: true,
    },
    middle_name: {
      type: 'String',
      required: false,
      trim: true,
    },
    last_name: {
      type: 'String',
      required: true,
      trim: true,
    },
    username: {
      type: 'String',
      required: true,
      trim: true,
    },
    gender: {
      type: 'String',
      required: true,
      trim: true,
    },
    email: {
      type: 'String',
      required: true,
      trim: true,
    },
    birthday: {
      type: 'String',
      required: true,
      trim: true,
    },

    profile_picture: {
      type: 'String',
      required: true,
      trim: true,
    },
    personal_address: {
      type: 'String',
      required: true,
      trim: true,
    },
    personal_address_country: {
      type: 'String',
      required: true,
      trim: true,
    },
    personal_address_country_code: {
      type: 'String',
      required: true,
      trim: true,
    },
    personal_address_city: {
      type: 'String',
      required: true,
      trim: true,
    },
    personal_address_state: {
      type: 'String',
      required: true,
      trim: true,
    },
    personal_address_zip_code: {
      type: 'String',
      required: true,
      trim: true,
    },
    job_title: {
      type: 'String',
      required: true,
      trim: true,
    },
    job_description: {
      type: 'String',
      required: true,
      trim: true,
    },
    job_type: {
      type: 'String',
      required: true,
      trim: true,
    },
    phone_number: {
      type: 'String',
      required: true,
      trim: true,
    },
    company_name: {
      type: 'String',
      required: true,
      trim: true,
    },
    company_description: {
      type: 'String',
      required: true,
      trim: true,
    },
    company_address: {
      type: 'String',
      required: true,
      trim: true,
    },
    company_country: {
      type: 'String',
      required: true,
      trim: true,
    },
    company_country_code: {
      type: 'String',
      required: true,
      trim: true,
    },
    company_zip_code: {
      type: 'String',
      required: true,
      trim: true,
    },
    company_time_zone: {
      type: 'String',
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
peopleSchema.plugin(toJSON);
peopleSchema.plugin(paginate);

/**
 * @typedef People
 */
const People = mongoose.model('People', peopleSchema);

module.exports = People;
