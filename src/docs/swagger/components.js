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
 *    Address:
 *     type: object
 *     required:
 *        - userId
 *        - name
 *        - firstname
 *        - lastname
 *        - address
 *        - postal
 *        - city
 *        - country
 *        - phone
 *     properties:
 *      userId:
 *       type: string
 *       format: uuid
 *       description: the id of user
 *      name:
 *       type: string
 *       description: the name of address
 *      firstname:
 *       type: string
 *       description: firstname of user
 *      lastname:
 *       type: string
 *       description: lastname of user
 *      company:
 *       type: string
 *       description: company of this address
 *      address:
 *       type: string
 *       description: address of user
 *      postal:
 *       type: string
 *       description: postal of this address
 *      city:
 *       type: string
 *       description: city of this address
 *      country:
 *       type: string
 *       description: country of this address
 *      phone:
 *       type: string
 *       description: phone of user
 *    Carrier:
 *     type: object
 *     required:
 *        - name
 *        - description
 *        - price
 *     properties:
 *      name:
 *       type: string
 *       description: the name of carrier
 *      description:
 *       type: string
 *       format: text
 *       description: description of carrier
 *      price:
 *       type: number
 *       format: double
 *       description: price of carrier
 *    Carousel:
 *     type: object
 *     required:
 *        - illustration
 *     properties:
 *      title:
 *       type: string
 *       description: title of the slide
 *      content:
 *       type: string
 *       format: text
 *       description: text of the slide
 *      illustration:
 *       type: string
 *       description: name of the image file
 *      btn_title:
 *       type: string
 *       description: call to action inside the slide
 *      btn_url:
 *       type: string
 *       description: link for the button
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
