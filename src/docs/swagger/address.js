/*----------------------- */
// GET /edit
/*----------------------- */

/**
 * @swagger
 * /address/edit:
 *  get:
 *    security:
 *      - AdminAuth: []
 *    summary: get one address by id
 *    description: only user can get address
 *    tags: [Addresses]
 *    parameters:
 *      - in: query
 *        name: id
 *        required: true
 *        description: id of address
 *    responses:
 *     200:
 *      description: object of one address
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *     500:
 *      description: error request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_500'
 */

/*----------------------- */
// GET /address/all
/*----------------------- */

/**
 * @swagger
 * /address/all:
 *  get:
 *    security:
 *      - AdminAuth: []
 *    summary: get all addresses of user
 *    description: only user can get all addresses
 *    tags: [Addresses]
 *    responses:
 *     200:
 *      description: Array of all addresses
 *      content:
 *        application/json:
 *          schema:
 *          example: {status: true,message: string,data: [{},{}]}
 *     500:
 *      description: error request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_500'
 */

/*----------------------- */
// POST /address/create
/*----------------------- */

/**
 * @swagger
 * /address/create:
 *  post:
 *    security:
 *      - AdminAuth: []
 *    summary: create a address
 *    description: only user admin can create address
 *    tags: [Addresses]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Address'
 *    responses:
 *     201:
 *      description: new address was created
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *     400:
 *      description: User not found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_4XX'
 *     500:
 *      description: error request
 */

/*----------------------- */
// PUT /address/update/{id}
/*----------------------- */

/**
 * @swagger
 * /address/update/{id}:
 *  put:
 *    security:
 *      - AdminAuth: []
 *    summary: update address
 *    description: only user can update address
 *    tags: [Addresses]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *        format: uuid
 *       required: true
 *       description: address id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Address'
 *    responses:
 *     200:
 *      description: Address was successfull updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *     400:
 *      description: Address not found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_4XX'
 *     500:
 *      description: Error request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_500'
 */

/*----------------------- */
// DELETE /address/delete
/*----------------------- */

/**
 * @swagger
 * /address/delete:
 *  delete:
 *    security:
 *      - AdminAuth: []
 *    summary: Delete address by id
 *    description: only user can delete address
 *    tags: [Addresses]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                format: uuid
 *              userId:
 *                type: string
 *                format: uuid
 *          example: {id: string, userId: string}
 *    responses:
 *     200:
 *      description: The Address was delete
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Address'
 *          example: {status: boolean, message: string}
 *     400:
 *      description: Address not found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Address'
 *          example: {status: boolean,type: string,message: string}
 *     500:
 *      description: Error request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_500'
 */
