/*----------------------- */
// GET /auth
/*----------------------- */

/**
 * @swagger
 * /auth:
 *  get:
 *    security:
 *      - AdminAuth: []
 *    summary: decode token jwt
 *    description: need Authorisation header with token
 *    tags: [Authentification]
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
 *            example: {status: boolean, data: {email: string,firstname: string,lastname: string}}
 *     401:
 *      description: user not found or authentification fail
 *      content:
 *        application/json:
 *          schema:
 *            example: {status: boolean,message: string}
 *     500:
 *      description: Error request
 */

/*----------------------- */
// POST /auth/login
/*----------------------- */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: login user
 *    description: verification email and password
 *    tags: [Authentification]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            example: {email: string,password: string}
 *    responses:
 *     200:
 *      description: set-Cookie Headers with token key
 *      content:
 *        application/json:
 *          schema:
 *            example: {status: boolean, message: string}
 *     401:
 *      description: user not found or verification fail
 *      content:
 *        application/json:
 *          schema:
 *            example: {status: boolean,type: string,message: string}
 *     500:
 *      description: Error request
 */

/*----------------------- */
// POST /auth/register
/*----------------------- */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: registration user
 *    description: all values are required, email was the unique key
 *    tags: [Authentification]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *     201:
 *      description: User was successfull created
 *      content:
 *        application/json:
 *          schema:
 *            example: {status: boolean, message: string}
 *     400,401:
 *      description: user not found or verification fail
 *      content:
 *        application/json:
 *          schema:
 *            example: {status: boolean,type: string,message: string}
 *     500:
 *      description: Error request
 */

/*----------------------- */
// PUT /auth/modify-password/{idToken}
/*----------------------- */

/**
 * @swagger
 * /auth/modify-password/{idToken}:
 *  put:
 *    summary: reset password
 *    description: token reset password was expired 1 hour after created
 *    tags: [Authentification]
 *    parameters:
 *     - in: path
 *       name: idToken
 *       schema:
 *        type: string
 *       required: true
 *       description: Token reset password Id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            example: {password: string, userId: string}
 *    responses:
 *     200:
 *      description: User was successfull created
 *      content:
 *        application/json:
 *          schema:
 *            example: {status: boolean, message: string}
 *     400,401:
 *      description: Verification token or password fail
 *      content:
 *        application/json:
 *          schema:
 *            example: {status: boolean,type: string,message: string}
 *     500:
 *      description: Error request
 */
