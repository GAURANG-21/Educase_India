const SchoolRepository = require("../repositories/addSchoolRepository.js");
const schoolRepository = new SchoolRepository();

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const result = await schoolRepository.addSchool({
      name,
      address,
      latitude,
      longitude,
    });

    if (result.error) return res.status(400).json(result);

    return res.status(201).json({
      message: "School added successfully",
      data: result.school,
    });
  } catch (error) {
    console.error('Error in addSchool controller:', error);
    return res.status(500).json({
      message: "Error adding school",
      error: error.message,
    });
  }
};

module.exports = {
  addSchool,
};
