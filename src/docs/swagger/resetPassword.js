/*----------------------- */
// GET /reset/{id}/{token}
/*----------------------- */

/**
 * @swagger
 * /reset/{id}/{token}:
 *  get:
 *    summary: verify validation of token
 *    description: after token was created , possible to get if token is used or valid expired 1 hour after created
 *    tags: [ResetPassword]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
 *        description: id of token in database
 *    responses:
 *     200:
 *      description: Object of user
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *          example: {status: boolean,message: string,data: {token: string,userId: string}}
 *     4XX:
 *      description: Error token was used, expired or not valid
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_4XX'
 *     500:
 *      description: server error verify the request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_500'
 */

/*----------------------- */
// POST /reset
/*----------------------- */

/**
 * @swagger
 * /reset:
 *  post:
 *    summary: create token
 *    description: with email user generate token for modify password
 *    tags: [ResetPassword]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ResetPassword'
 *          example: {email: jonh@doe.com}
 *    responses:
 *     200:
 *      description: Token Reset Password was created
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *     4XX:
 *      description: User was not found or email is not valid
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_4XX'
 *     500:
 *      description: server error verify the request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_500'
 */
