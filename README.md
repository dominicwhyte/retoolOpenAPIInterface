# [openapiinterface.com](https://openapiinterface.com)

## What it is
[openapiinterface.com](https://openapiinterface.com) is an interface that: 
1. Lets users provide an OpenAPI Specification like https://petstore.swagger.io/v2/swagger.json
2. Generates a UI that allows users to make requests to the documented API directly from the browser.
3. Shows the resulting payload from the executed API query.

## A few known limitations
*To stay within the time constraints of the take-home, I chose to omit a few pieces of functionality. All of the following would be easy to add with the existing structure of the code base*
1. Supporting a greater number of authentication schemes (only apiKey is supported right now)
2. Supporting http (not just https) requests for APIs that support it
3. Uploading files
4. Basic testing. This is the next task I would have worked on. Even basic tests for making sure that the various types of requests with the various types of inputs return the desired outputs would be very helpful.
5. Cookie parameters are not yet supported

## APIs I tested with
1. [https://raw.githubusercontent.com/dominicwhyte/TestFiles/master/swagger.json](https://raw.githubusercontent.com/dominicwhyte/TestFiles/master/swagger.json)
2. [https://petstore.swagger.io/v2/swagger.json](https://petstore.swagger.io/v2/swagger.json)
