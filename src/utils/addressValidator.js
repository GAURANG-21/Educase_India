const axios = require("axios");

const addressValidator = async (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  // Check if all fields are provided
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  }

  const url = `https://apihub.latlong.ai/v4/geovalidation.json?address=${address}&latitude=${latitude}&longitude=${longitude}`;

  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url,
      headers: {
        "X-Authorization-Token": process.env.LATLONG_API_TOKEN,
      },
    };

    const response = await axios(config);
    console.log(response.data.data.distance);

    if (
      response?.data?.data?.distance &&
      typeof response.data.data.distance.aerial === "string" &&
      typeof response.data.data.distance.driving === "string"
    ) {
      const aerialDistanceKm = parseFloat(
        response.data.data.distance.aerial.replace(" km", "")
      );
      const drivingDistanceKm = parseFloat(
        response.data.data.distance.driving.replace(" km", "").replace("~", "")
      );

      const aerialDistanceM = aerialDistanceKm * 1000;
      const drivingDistanceM = drivingDistanceKm * 1000;

      if (aerialDistanceM < 2000)
        console.log("Distance is less than 300 meters");
      else {
        return res.status(500).json({
          message: "Address too far from the entered location",
        });
      }
    } else {
      console.error("Invalid response structure or missing distance data");
      return res.status(500).json({
        message: "Invalid response structure or missing distance data",
      });
    }

    next();
  } catch (error) {
    console.error("Error validating address:", error);
    res.status(500).json({
      message: "Error validating address",
      error: error.message,
    });
  }
};

module.exports = addressValidator;
