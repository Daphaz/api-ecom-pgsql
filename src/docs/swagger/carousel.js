/*----------------------- */
// GET /carousel
/*----------------------- */

/**
 * @swagger
 * /carousel:
 *  get:
 *    summary: select one slide by ID
 *    description: get one slide information
 *    tags: [Carousels]
 *    parameters:
 *     - in: query
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: id of the carousel
 *    responses:
 *     200:
 *      description: Object of carousel slide
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *          example: {status: boolean,message: string,data: {}}
 *     400:
 *      description: Dont find any carousel
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
// GET /carousel/all
/*----------------------- */

/**
 * @swagger
 * /carousel/all:
 *  get:
 *    summary: all the carousels
 *    description: get a array of all slides
 *    tags: [Carousels]
 *    responses:
 *     200:
 *      description: Object
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *          example: {status: boolean,message: string,data: [{},{}]}
 *     400:
 *      description: Dont find any carousels
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
// POST /carousel/create
/*----------------------- */

/**
 * @swagger
 * /carousel/create:
 *  post:
 *    security:
 *      - AdminAuth: []
 *    summary: create one carousel
 *    description: only user admin can create carousel, for the illustration we need input[type='file'] html with name "illustration" and the form will contain "enctype='multipart/form-data'"
 *    tags: [Carousels]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Carousel'
 *          example: {title: string,content: string,btn_title: string,btn_url: string, illustration: file}
 *    responses:
 *     201:
 *      description: Carousel successfull created
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
// PUT /carousel/update/{id}
/*----------------------- */

/**
 * @swagger
 * /carousel/update/{id}:
 *  put:
 *    security:
 *      - AdminAuth: []
 *    summary: update carousel
 *    description: only user admin can update carousel
 *    tags: [Carousels]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: id of the carousel
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Carousel'
 *          example:
 *            title: Carousel one
 *            content: long text
 *            illustration: carousel-one.jpg
 *            btn_title: buy now
 *            btn_url: http://my-website.com/product/2
 *    responses:
 *     201:
 *      description: Carousel was updated
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
// DELETE /carousel/delete
/*----------------------- */

/**
 * @swagger
 * /carousel/delete:
 *  delete:
 *    security:
 *      - AdminAuth: []
 *    summary: delete carousel
 *    description: only user admin can delete carousel
 *    tags: [Carousels]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Carousel'
 *          example:
 *            id: 12
 *    responses:
 *     200:
 *      description: Carousel was deleted
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sucess_200'
 *          example: {status: boolean,message: string}
 *     400:
 *      description: Carousel not found
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
