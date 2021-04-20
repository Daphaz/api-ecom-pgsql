import { Router } from "express";
const user = require("../controllers/UserController");
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *     type: object
 *     required:
 *        - email
 *        - password
 *        - firstname
 *        - lastname
 *     properties:
 *      email:
 *       type: string
 *       description: the email of the user
 *      password:
 *       type: string
 *       description: password of the user
 *      firstname:
 *       type: string
 *       description: Firstname of the user
 *      lastname:
 *       type: string
 *       description: Lastname of the user
 *     exemple:
 *      id: 1
 *      email: john@doe.com
 *      password: pabdshbhd#_777
 *      firstname: John
 *      lastname: Doe
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User managing API
 */

/**
 * @swagger
 * /user/{id}:
 *  get:
 *    summary: Get one user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: the user id
 *    responses:
 *     200:
 *      description: Object of user
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     400:
 *      description: User not found
 *      content:
 *        application/json:
 */
router.get("/:id", user.getUser);

/**
 * @swagger
 * /user/create:
 *  post:
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
 *      400:
 *        description: there missing field in body
 *      401:
 *        description: The email as already used
 *      500:
 *        description: there is a server error
 */
router.post("/create", user.createUser);

/**
 * @swagger
 * /user/update/{id}:
 *  put:
 *    summary: Update user by id
 *    tags: [Users]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: the user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      204:
 *        description: The User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: User doesn't exists
 *      500:
 *        description: there is a server error
 */
router.put("/update/:id", user.updateUser);

/**
 * @swagger
 * /user/delete:
 *  delete:
 *    summary: Delete user by id
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: integer
 *          required: true
 *          description: the user id
 *    responses:
 *      200:
 *        description: The User was delete
 *      400:
 *        description: User doesn't exists
 *      500:
 *        description: there is a server error
 */
router.delete("/delete", user.deleteUser);

export default router;
