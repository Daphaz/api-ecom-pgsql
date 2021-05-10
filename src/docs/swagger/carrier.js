/*----------------------- */
// GET /carrier/{id}
/*----------------------- */

/**
 * @swagger
 * /carrier/edit/{id}:
 *  get:
 *    security:
 *      - AdminAuth: []
 *    summary: get one carrier by id
 *    description: only user can get carrier
 *    tags: [Carriers]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: id of the carrier
 *    responses:
 *     200:
 *      description: object of one carrier
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
// GET /carrier/all
/*----------------------- */

/**
 * @swagger
 * /carrier/all:
 *  get:
 *    security:
 *      - AdminAuth: []
 *    summary: get all carriers
 *    description: only user can get carriers
 *    tags: [Carriers]
 *    responses:
 *     200:
 *      description: Array of all carriers
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
// POST /carrier/create
/*----------------------- */

/**
 * @swagger
 * /carrier/create:
 *  post:
 *    security:
 *      - AdminAuth: []
 *    summary: create a carrier
 *    description: only user admin can create carrier
 *    tags: [Carriers]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Carrier'
 *    responses:
 *     201:
 *      description: new carrier was created
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
// PUT /carrier/update/{id}
/*----------------------- */

/**
 * @swagger
 * /carrier/update/{id}:
 *  put:
 *    security:
 *      - AdminAuth: []
 *    summary: update carrier
 *    description: only user admin can update carrier
 *    tags: [Carriers]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *        format: uuid
 *       required: true
 *       description: carrier id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Carrier'
 *    responses:
 *     200:
 *      description: Carrier was successfull updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *     400:
 *      description: Carrier not found
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
// DELETE /carrier/delete
/*----------------------- */

/**
 * @swagger
 * /carrier/delete:
 *  delete:
 *    security:
 *      - AdminAuth: []
 *    summary: Delete carrier by id
 *    description: only user admin can delete carrier
 *    tags: [Carriers]
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
 *          example: {id: string}
 *    responses:
 *     200:
 *      description: The Carrier was delete
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *     400:
 *      description: Carrier not found
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
