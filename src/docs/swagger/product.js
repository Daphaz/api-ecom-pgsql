/*----------------------- */
// GET /product/all
/*----------------------- */

/**
 * @swagger
 * /product/all:
 *  get:
 *    summary: all the products
 *    description: get a array of all products
 *    tags: [Products]
 *    responses:
 *     200:
 *      description: Object of user
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *          example: {status: boolean,message: string,data: [{},{}]}
 *     400:
 *      description: Dont find any products
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
// POST /product/create
/*----------------------- */

/**
 * @swagger
 * /product/create:
 *  post:
 *    security:
 *      - AdminAuth: []
 *    summary: create one product
 *    description: only user admin can create product, for the illustration we need input[type='file'] html with name "illustration" and the form will contain "enctype='multipart/form-data'"
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *          example: {name: string,slug: string,subtitle: string,description: string,price: number}
 *    responses:
 *     201:
 *      description: Product successfull created
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *          example: {status: boolean,message: string,data: {}}
 *     400:
 *      description: Missing some parameter
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
// PUT /product/set-category/{id}
/*----------------------- */

/**
 * @swagger
 * /product/set-category/{id}:
 *  put:
 *    security:
 *      - AdminAuth: []
 *    summary: update category id
 *    description: only user admin can create product
 *    tags: [Products]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *        format: uuid
 *       required: true
 *       description: id of the product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *          example:
 *            categoryId: string
 *    responses:
 *     200:
 *      description: Category was added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *          example: {status: boolean,message: string,data: {}}
 *     500:
 *      description: server error verify the request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_500'
 */

/*----------------------- */
// PUT /product/set-category/{id}
/*----------------------- */

/**
 * @swagger
 * /product/is-best/{id}:
 *  put:
 *    security:
 *      - AdminAuth: []
 *    summary: update isBest product
 *    description: only user admin can update parameter product, show product in homepage is best section
 *    tags: [Products]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *        format: uuid
 *       required: true
 *       description: id of the product
 *    responses:
 *     200:
 *      description: Product marked isBest
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *          example: {status: boolean,message: string}
 *     500:
 *      description: server error verify the request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_500'
 */

/*----------------------- */
// PUT /product/update/{id}
/*----------------------- */

/**
 * @swagger
 * /product/update/{id}:
 *  put:
 *    security:
 *      - AdminAuth: []
 *    summary: update product
 *    description: only user admin can update product
 *    tags: [Products]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *        format: uuid
 *       required: true
 *       description: id of the product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *          example:
 *            name: Product one
 *            slug: product-one
 *            illustration: product-one.jpg
 *            subtitle: lorem i ner mlerrmlee
 *            description: long text
 *            price: 900
 *    responses:
 *     201:
 *      description: Product was updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *          example: {status: boolean,message: string}
 *     400:
 *      description: Missing some parameter
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_4XX'
 *          example: {status: boolean,type: string,message: string}
 *     500:
 *      description: server error verify the request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_500'
 */

/*----------------------- */
// DELETE /product/delete
/*----------------------- */

/**
 * @swagger
 * /product/delete:
 *  delete:
 *    security:
 *      - AdminAuth: []
 *    summary: delete product
 *    description: only user admin can delete product
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *          example:
 *            id: uuid
 *    responses:
 *     200:
 *      description: Product was deleted
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *          example: {status: boolean,message: string}
 *     400:
 *      description: Product not found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_4XX'
 *          example: {status: boolean,type: string,message: string}
 *     500:
 *      description: server error verify the request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error_500'
 */
