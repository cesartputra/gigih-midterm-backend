
# GIGIH Midterm Backend

An API for Tokopedia Play App using MongoDB, Express.js, Node.js




## How To Run

**Clone The Project From Github**
```
git clone https://github.com/cesartputra/gigih-midterm-backend
```

**Installing Depedencies**
```
npm install
```

**Start MongoDB Service (Mac)**
```
brew services start mongodb/brew/mongodb-community
```

**Run the Project**
```
npm run prod
```
## MongoDB Schema Models

### Video

```
const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    videoUrl: {
        required: true,
        type: String
    },
    thumbnailUrl: {
        required: true,
        type: String
    },
    createdAt: {
        required: true,
        type: Date
    },
    updatedAt: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model("Video", videoSchema)
```
### Product

```
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    videoId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    productUrl: {
        required: true,
        type: String
    },
    createdAt: {
        required: true,
        type: Date
    },
    updatedAt: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model("Product", productSchema)
```
### Comment

```
const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    videoId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    createdAt: {
        required: true,
        type: Date
    },
    updatedAt: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model("Comment", commentSchema)
```
### User

```
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    avatar: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("User", userSchema)
```
## API Reference

**Introduction**

This API allows you to interact with Tokopedia Play platform and access various resources.

**Base URL**
```
http://localhost:3000/
```

**Endpoints**

### Video

#### Add Video

```http
  POST /api/videos
```
Creates a new Video and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
{
    title: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string
}
```
* **Success Response:**  
    * **Code:** 200  
      **Content:**  
        ```
        {
            status: success,
            data: {
                videoToSave: { <video_object> }
            }
        }
        ``` 
* **Error Response:**
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error adding video'
    }
    ```

#### Get All Videos

```http
  GET /api/videos
```
Returns all videos in the database.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
    status: success,
    data: {
        videos: [
            { <video_object> }
        ]
    }
}
```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'videos not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error getting video'
    }
    ```

#### Get All Videos With Comments With User

```http
  GET /api/videos/:id?current=:current&size=:size
```
Returns all videos with comments and user data in the database.
* **URL Params**  
  *Required:* `id=[string]`
* **Query Params**  
  *Required:* `page=[string]`
  
  *Required:* `size=[string]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
    status: success,
    data: {
        videos: [
            { <video_object> },
            comments: [
                { <comments_object> },
                user:[
                    { <user_object> }
                ]
            ]
        ]
    }
}
```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'videos not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error getting video'
    }
    ```

#### Update Video

```http
  PUT /api/videos/:id
```
Update a Video and returns the updated object.
* **URL Params**  
  *Required:* `id=[string]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
{
    title: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string
}
```
* **Success Response:**  
    * **Code:** 200  
        **Content:**  
        ```
        {
            status: success,
            data: {
                videoToUpdate: { <video_object> }
            }
        }
        ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'video not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error updating video'
    }
    ```

  #### Delete Video

```http
  DELETE /api/videos/:id
```
Delete a Video and returns the deleted object.
* **URL Params**  
  *Required:* `id=[string]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
* **Success Response:**  
    * **Code:** 200  
        **Content:**  
        ```
        {
            status: success,
            data: {
                videoToDelete: { <video_object> }
            }
        }
        ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'video not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error deleting video'
    }
    ```

### Product

#### Add Product

```http
  POST /api/products
```
Creates a new Product and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
{
    title: string,
    description: string,
    price: number,
    videoId: string,
    productUrl: string,
}
```
* **Success Response:**  
    * **Code:** 200  
      **Content:**  
        ```
        {
            status: success,
            data: {
                productToSave: { <product_object> }
            }
        }
        ``` 
* **Error Response:**
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error adding product'
    }
    ```

#### Get All Products

```http
  GET /api/products
```
Returns all products in the database.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
    ```
    {
        status: success,
        data: {
            products: [
                { <product_object> }
            ]
        }
    }
    ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'products not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error getting products'
    }
    ```

#### Get Products by Video ID

```http
  GET /api/videos/:id?videoId=:videoId
```
Returns all products by video ID in the database.
* **URL Params**  
  None
* **Query Params**  
  *Required:* `videoId=[string]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
    * **Code:** 200  
        **Content:**  
        ```
        {
            status: success,
            data: {
                products: [
                    { <product_object> }
                ]
            }
        }
        ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'products not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error getting products'
    }
    ```

#### Get Product by Id

```http
  GET /api/products/:id
```
Update a Product and returns the updated object.
* **URL Params**  
  *Required:* `id=[string]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
  None
* **Success Response:**  
    * **Code:** 200  
        **Content:**  
        ```
        {
            status: success,
            data: {
                product: { <product_object> }
            }
        }
        ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'product not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error updating product'
    }
    ```

#### Update Product

```http
  PUT /api/products/:id
```
Update a Product and returns the updated object.
* **URL Params**  
  *Required:* `id=[string]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
{
    title: string,
    description: string,
    price: number,
    videoId: string,
    productUrl: string,
}
```
* **Success Response:**  
    * **Code:** 200  
        **Content:**  
        ```
        {
            status: success,
            data: {
                productToUpdate: { <product_object> }
            }
        }
        ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'product not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error updating product'
    }
    ```

  #### Delete Product

```http
  DELETE /api/products/:id
```
Delete a Product and returns the deleted object.
* **URL Params**  
  *Required:* `id=[string]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
* **Success Response:**  
    * **Code:** 200  
        **Content:**  
        ```
        {
            status: success,
            data: {
                productToDelete: { <product_object> }
            }
        }
        ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'product not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error deleting product'
    }
    ```

### Comment

#### Add Comment

```http
  POST /api/comments
```
Creates a new Comment and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
{
    "content": string,
    "userId": string,
    "videoId": string
}
```
* **Success Response:**  
    * **Code:** 200  
      **Content:**  
        ```
        {
            status: success,
            data: {
                commentToSave: { <comment_object> }
            }
        }
        ``` 
* **Error Response:**
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error adding comment'
    }
    ```

<!-- #### Get All Comments

```http
  GET /api/comments
```
Returns all comments in the database.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
    ```
    {
        status: success,
        data: {
            comments: [
                { <product_object> }
            ]
        }
    }
    ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'comments not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error getting comments'
    }
    ```

#### Get Comment by Id

```http
  GET /api/comments/:id
```
Update a Comment and returns the updated object.
* **URL Params**  
  *Required:* `id=[string]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
  None
* **Success Response:**  
    * **Code:** 200  
        **Content:**  
        ```
        {
            status: success,
            data: {
                comment: { <comment_object> }
            }
        }
        ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'comment not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error updating comment'
    }
    ``` -->

#### Update Comment

```http
  PUT /api/comments/:id
```
Update a Comment and returns the updated object.
* **URL Params**  
  *Required:* `id=[string]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
{
    "content": string,
    "userId": string,
    "videoId": string
}
```
* **Success Response:**  
    * **Code:** 200  
        **Content:**  
        ```
        {
            status: success,
            data: {
                commentToUpdate: { <comment_object> }
            }
        }
        ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'comment not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error updating comment'
    }
    ```

  #### Delete Comment

```http
  DELETE /api/comments/:id
```
Delete a Comment and returns the deleted object.
* **URL Params**  
  *Required:* `id=[string]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
* **Success Response:**  
    * **Code:** 200  
        **Content:**  
        ```
        {
            status: success,
            data: {
                commentToDelete: { <comment_object> }
            }
        }
        ```
* **Error Response:**  
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'comment not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error deleting comment'
    }
    ```

### Search

#### Get Search Videos and Product

```http
  GET /api/search
```
Returns all videos and all products data based on search
* **URL Params**  
  None
* **Query Params**  
  *Required:* `q=[string]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
  None
* **Success Response:**  
    * **Code:** 200  
      **Content:**  
        ```
        {
            status: success,
            data: {
                videos: [
                    { <video_object> }
                ],
                products: [
                    { <product_object> }
                ]
            }
        }
        ``` 
* **Error Response:**
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'search not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error getting search'
    }
    ```

### Auth

#### Register User

```http
  POST /api/auth/register
```
Creates a new User and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
{
    "username": string,
    "password": string
}
```
* **Success Response:**  
    * **Code:** 200  
      **Content:**  
        ```
        {
            status: success,
            data: {
                userToSave: { <user_object> }
            }
        }
        ``` 
* **Error Response:**
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error registering user'
    }
    ```

### User

#### Get Users

```http
  GET /api/users
```
Returns all User in the database
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
  None
* **Success Response:**  
    * **Code:** 200  
      **Content:**  
        ```
        {
            status: success,
            data: {
                users: { <user_object> }
            }
        }
        ``` 
* **Error Response:**
  * **Code:** 404  
    **Content:**
    ```
    {
        status: 'failed',
        message: 'users not found'
    }
    ```
  * **Code:** 500  
    **Content:**
    ```
    {
        error: 'error getting users'
    }
    ```