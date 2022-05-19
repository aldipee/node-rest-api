const express = require('express');
const validate = require('../../middlewares/validate');
const peopleValidation = require('../../validations/people.validation');
const peopleController = require('../../controllers/people.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(peopleValidation.createNewPeople), peopleController.createNewPeopleData)
  .get(peopleController.getPeopleData);

router.route('/:peopleId').get(validate(peopleValidation.getPeopleById), peopleController.getPeopleDataById);

module.exports = router;
