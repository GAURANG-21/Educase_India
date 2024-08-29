const { Schools } = require("../models/index.js");
const haversineDistance = require("../utils/distanceFinder.js");

class SchoolRepository {
  async addSchool({ name, address, latitude, longitude }) {
    try {
      // console.log("Checking for existing school...");
      const existingSchool = await Schools.findOne({
        where: { name, address },
      });
      // console.log("Existing school check complete.");

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

      // console.log(result);

      return result;
    } catch (error) {
      // console.error("Error in addSchool:", error);
      return {
        error: "Error adding school",
        message: error.message,
      };
    }
  }

  async getSchoolByDistance(req) {
    try {
      const { latitude, longitude } = req;
      const schools = await Schools.findAll();

      const schoolsWithDistance = await schools.map((school) => {
        const distance = (
          latitude,
          longitude,
          school.latitude,
          school.longitude
        );
        return { ...school.toJSON(), distance };
      });

      schoolsWithDistance.sort((a, b) => a.distance - b.distance);

      return schoolsWithDistance;
    } catch (error) {
      return {
        error: "Error getting schools by distance",
        message: error.message,
      };
    }
  }
}

module.exports = SchoolRepository;
