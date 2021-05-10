/*----------------------- */
// GET /user
/*----------------------- */

/**
 * @swagger
 * /user:
 *  get:
 *    security:
 *      - AdminAuth: []
 *    summary: Get one user by ID
 *    tags: [Users]
 *    headers:
 *      Authorization:
 *        schema:
 *          type:  string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjE5MDUxNjI3LCJleHAiOjE2MTkwNTIyMjd9.fk2PlDgFzfkz6nIl9pEYMksWkRw-cs9thcv0NPgqGIQ
 *    parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    responses:
 *     200:
 *      description: Object of user
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     500:
 *      description: Error request
 */

/*----------------------- */
// GET /user/all
/*----------------------- */

/**
 * @swagger
 * /user/all:
 *  get:
 *    security:
 *      - AdminAuth: []
 *    summary: Get all user
 *    description: only admin can use this route
 *    tags: [Users]
 *    headers:
 *      Authorization:
 *        schema:
 *          type:  string
 *    responses:
 *     200:
 *      description: Object of user
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     500:
 *      description: Error request
 */

/*----------------------- */
// POST /user/create
/*----------------------- */

/**
 * @swagger
 * /user/create:
 *  post:
 *    security:
 *      - AdminAuth: []
 *    summary: Create new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: The User was Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400,401:
 *        description: there missing field in body, email or password is not valid
 *        content:
 *          application/json:
 *            schema:
 *              example: {status: boolean,type: string, message: string}
 *      500:
 *        description: there is a server error
 */

/*----------------------- */
// PUT /user/update/{id}
/*----------------------- */

/**
 * @swagger
 * /user/update/{id}:
 *  put:
 *    security:
 *      - AdminAuth: []
 *    summary: Update user by id
 *    tags: [Users]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *       required: true
 *       description: the user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The User was updated
 *        content:
 *          application/json:
 *            schema:
 *              example: {status: boolean, message: string}
 *      400:
 *        description: User doesn't exists or email is inValid
 *        content:
 *          application/json:
 *            schema:
 *              example: {status: boolean,type: string, message: string}
 *      500:
 *        description: there is a server error
 */

/*----------------------- */
// PUT /user/modify-password
/*----------------------- */

/**
 * @swagger
 * /user/modify-password:
 *  put:
 *    security:
 *      - AdminAuth: []
 *    summary: Update password user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              example: {password: string}
 *    responses:
 *      200:
 *        description: The User password was updated
 *        content:
 *          application/json:
 *            schema:
 *              example: {status: boolean, message: string}
 *      400:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              example: {status: boolean,type: string, message: string}
 *      500:
 *        description: there is a server error
 */

/*----------------------- */
// DELETE /user/delete
/*----------------------- */

/**
 * @swagger
 * /user/delete:
 *  delete:
 *    security:
 *      - AdminAuth: []
 *    summary: Delete user by id
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: string
 *            example: {id: string}
 *    responses:
 *      200:
 *        description: The User was delete
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: {status: boolean,message: string}
 *      400:
 *        description: User doesn't exists
 *      500:
 *        description: there is a server error
 */
