/*----------------------- */
// GET /category/all
/*----------------------- */

/**
 * @swagger
 * /category/all:
 *  get:
 *    summary: get all categories product
 *    tags: [Categories]
 *    responses:
 *     200:
 *      description: Array of all categories
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *          example: {status: boolean,message: string, data: [{name : string}]}
 *     500:
 *      description: error request
 *      content:
 *        application/json:
 *          schema:
 *            example: {message: string}
 */

/*----------------------- */
// POST /category/create
/*----------------------- */

/**
 * @swagger
 * /category/create:
 *  post:
 *    security:
 *      - AdminAuth: []
 *    summary: create a category
 *    description: only user admin can create category
 *    tags: [Categories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *     200:
 *      description: new category was created
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *          example: {status: boolean,message: string, data: [{name : string}]}
 *     400,401:
 *      description: Missing information or name already exist
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *          example: {status: boolean,type: string, messsage: string}
 *     500:
 *      description: error request
 */

/*----------------------- */
// PUT /update/{id}
/*----------------------- */

/**
 * @swagger
 * /auth/update/{id}:
 *  put:
 *    security:
 *      - AdminAuth: []
 *    summary: update category name
 *    description: only user admin can update category
 *    tags: [Categories]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *        format: uuid
 *       required: true
 *       description: Category id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *     200:
 *      description: User was successfull created
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *          example: {status: boolean, message: string}
 *     400:
 *      description: Missing parameters or category not found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *          example: {status: boolean,type: string,message: string}
 *     500:
 *      description: Error request
 */

/*----------------------- */
// DELETE /category/delete
/*----------------------- */

/**
 * @swagger
 * /category/delete:
 *  delete:
 *    security:
 *      - AdminAuth: []
 *    summary: Delete category by id
 *    description: only user admin can update category
 *    tags: [Categories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *          example: {id: string}
 *    responses:
 *     200:
 *      description: The Category was delete
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *          example: {status: boolean, message: string}
 *     400:
 *      description: Category not found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *          example: {status: boolean,type: string,message: string}
 *     500:
 *      description: Error request
 */
