## CRUD API

> Create Review
  - POST /Reviews
  - Request body contains the review JSON
  - Returns newly created review

> Read Review
  - GET /Reviews/:reviewId
  - Request param has the reviewId
  - Returns the exisitng review by reviewId

> Update Review
  - PUT /Reviews
  - Request body has the review to be updated
  - Returns the count of updated records

> Delete Review
  - DELETE /Reviews
  - Request body has the reviewId for the review to be deleted
  - Return a success code of 201 on successful deletion