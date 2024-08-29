const {Schools} = require('../models/index.js')

class SchoolRepository {
  async addSchool({ name, address, latitude, longitude }) {
    try {
      console.log('Checking for existing school...');
      const existingSchool = await Schools.findOne({
        where: { name, address },
      });
      console.log('Existing school check complete.');
      
      if (existingSchool) {
        return {
          error: "School exists",
          message: "School with this name and address already exists.",
        };
      }

      const result = await Schools.create({
        name,
        address,
        latitude,
        longitude,
      });
      
      console.log(school);

      return { school };
    } catch (error) {
      console.error('Error in addSchool:', error);
      return {
        error: "Error adding school",
        message: error.message,
      };
    }
  }
}

module.exports = SchoolRepository;
