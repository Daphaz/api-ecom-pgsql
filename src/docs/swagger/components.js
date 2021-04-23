/**
 * @swagger
 * components:
 *  securitySchemes:
 *    AdminAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *      in: header
 *      name: token
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
 *      id: seiuhjr-dfccdk-dsfds
 *      email: john@doe.com
 *      password: pabdshbhd#_777
 *      firstname: John
 *      lastname: Doe
 *    Category:
 *     type: object
 *     required:
 *        - name
 *     properties:
 *      name:
 *       type: string
 *       description: the name of category
 *     exemple:
 *      id: sdfd-sdfdf-vvr
 *      name: category1
 */
