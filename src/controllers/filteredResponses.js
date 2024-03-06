const axios = require("axios");

const { API_KEY } = require('../config/config');


exports.getFilteredResponses = async (req, res) => {
  try {
    const { formId } = req.params;
    const { filters } = req.query;

    // Parse the filters from JSON string to JavaScript object

    // Set up headers with authorization
    const headers = {
      'Authorization': `Bearer ${API_KEY}`
    };

    // Fetch data from the API
    const response = await axios.get(
      `https://api.fillout.com/v1/api/forms/${formId}/submissions`,
      {
        params: req.query, // Pass query parameters to the API request
        headers // Include headers in the request
      }
    );

    // Extract responses from the API response
    const apiResponses = response.data.responses;

    const responseFilters = filters ? JSON.parse(filters) : [];

    // Filter responses based on the provided filters
    const filteredResponses = filterResponsesByFilters(
      apiResponses,
      responseFilters
    );

    // Calculate total responses and page count
    const totalResponses = filteredResponses.length;
    const pageCount = Math.ceil(totalResponses / 10); // Assuming 10 responses per page

    // Return filtered responses along with totalResponses and pageCount
    res.json({
      responses: filteredResponses,
      totalResponses,
      pageCount,
    });
  } catch (error) {
    if (error?.response?.data) {
      const { statusCode, error: responseError, message } = error?.response?.data
      return res.status(statusCode).json({ error: responseError, message });
    }
    else {
      return res.status(500).json({ error: "something is wrong" });
    }
  }
};


// Function to filter responses based on the provided filters
function filterResponsesByFilters(responses, filters) {
    return responses.filter(response => {
        return filters.every(filter => {
            const question = response.questions.find(question => question.id === filter.id);
            if (!question) return false;

            switch (filter.condition) {
                case 'equals':
                    return question.value === filter.value;
                case 'does_not_equal':
                    return question.value !== filter.value;
                case 'greater_than':
                    return new Date(question.value) > new Date(filter.value);
                case 'less_than':
                    return new Date(question.value) < new Date(filter.value);
                default:
                    return false;
            }
        });
    });
}
