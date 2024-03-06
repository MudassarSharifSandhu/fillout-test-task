
# Fillout take-home assignment

This project is a Node.js application that uses the Express framework to create an API endpoint for fetching and filtering form submission data from a third-party service.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
What things you need to install the software and how to install them:

- Node.js
- npm (Node Package Manager)
### Installing
A step-by-step series of examples that tell you how to get a development environment running:

    1. Clone the repository to your local machine.
    2. Navigate to the project directory.
    3. Install the project dependencies by running:
       
       npm install

    4. Create a .env file in the root directory and add your API_KEY:
        1. PORT=8008
        2. API_KEY=your_api_key_here
    5. Start the server:
    
        npm start
    


## Request
- Path: `/{formId}/filteredResponses`
- Method: `GET`
- Query parameters: same as our [responses endpoint](https://www.fillout.com/help/fillout-rest-api#d8b24260dddd4aaa955f85e54f4ddb4d), except for a new `filters` parameter (JSON stringified):


## API Reference

#### Get all Forms

```http
  GET /{formId}/filteredResponses
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `formId` | `string` | **Required**. Form Id |


| Query Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `limit=10`      | `string` | **Optional**. Limits the number of responses to return to 10 |
| `offset=0`      | `string` | **Optional**. Used for pagination, indicating the starting point for the query results. '0' means starting from the first result |
| `includeEditLink=true`      | `string` | **Optional**. Suggests that the response should include edit links for the filtered responses. |
| `sort=asc`      | `string` | **Optional**. Indicates the sorting order of the results should be ascending |
| `filters=[{"id":"4KC356y4M6W8jHPKx9QfEy","condition":"equals","value":"Nothing much to share yet!"}]:`      | `string` | **Optional**. A JSON-encoded array of filter objects. Each object specifies a field to filter by, with properties like id, condition, and value. This filter will only return responses where the field with ID 4KC356y4M6W8jHPKx9QfEy equals the string "Nothing much to share yet!". |

