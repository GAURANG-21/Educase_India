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
    // console.error("Error in addSchool controller:", error);
    return res.status(500).json({
      message: "Error adding school",
      error: error.message,
    });
  }
};

const getAllSchool = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Please provide latitude and longitude" });
    }
    const response = await schoolRepository.getSchoolByDistance({ latitude, longitude });

    return res.status(200).json({
      success: true,
      message: "Schools found and sorted according to radial distance",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching schools",
      error: error.message,
    });
  }
};

module.exports = {
  addSchool,
  getAllSchool,
};
