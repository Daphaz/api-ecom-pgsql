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
 *    ResetPassword:
 *     type: object
 *     required:
 *        - userId
 *        - token
 *        - status
 *     properties:
 *      userID:
 *       type: string
 *       format: uuid
 *       description: id of user who want reset password
 *      token:
 *       type: string
 *       description: token for protected route frontend
 *      status:
 *       type: integer
 *       description: status of token used
 *     exemple:
 *      userId: sdfdf-dsfdf-fdfdfd
 *      token: dJDJDF88dddfv
 *      status: 0
 *    Product:
 *     type: object
 *     required:
 *        - name
 *        - slug
 *        - illustration
 *        - subtitle
 *        - description
 *        - price
 *     properties:
 *      categoryId:
 *       type: string
 *       format: uuid
 *       description: id of category for filter product
 *      name:
 *       type: string
 *       description: name of product who is used for slug url
 *      slug:
 *       type: string
 *       description: slug url no space and character special
 *      illustration:
 *       type: string
 *       description: name of the image file
 *      description:
 *       type: string
 *       format: text
 *       description: product description
 *      price:
 *       type: number
 *       format: double
 *       description: price of the product
 *    Category:
 *     type: object
 *     required:
 *        - name
 *     properties:
 *      name:
 *       type: string
 *       description: the name of category
 *    Sucess_200:
 *     type: object
 *     properties:
 *      status:
 *       type: boolean
 *      message:
 *       type: string
 *      data:
 *       type: object
 *    Error_4XX:
 *     type: object
 *     properties:
 *      status:
 *       type: boolean
 *      type:
 *       type: string
 *      message:
 *       type: string
 *    Error_500:
 *     type: object
 *     properties:
 *      message:
 *       type: string
 */
