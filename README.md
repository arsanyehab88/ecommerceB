# ecommerce BackEnd
# Response
Response Codes
201 Created: The category was successfully created.
400 Bad Request: The request body was invalid.
401 Unauthorized: The user is not authenticated.
403 Forbidden: The user is not authorized to create categories.
500 Internal Server Error: An error occurred on the server.
# Documentations : https://documenter.getpostman.com/view/24639198/2s93zE4foD

# Category
### POST Create Category  (/Create Category)
### GET GetAllCategorys (/Category?page=3)
### GET GetCategoryById (/Category/{_id})
### PUT UpdateCategory (/Category/)
### DELETE DeleteCategory (/Category/{_id})


# Brand
### POST Create  (/Brand)
### GET GetAll (/Brand?page=3)
### GET Get By Id (/Brand/{_id})
### PUT Update  (/Brand/)
### DELETE Delete  (/Brand/{_id})


# SubCategory
### POST Create  (/SubCategory)
### GET GetAll (/SubCategory?page=3)
### GET Get By Id (/SubCategory/{_id})
### PUT Update  (/SubCategory/)
### DELETE Delete  (/SubCategory/{_id})

# Product
### POST Create  (/Product)
### GET GetAll (/Product?page=3)
### GET Get By Id (/Product/{_id})
### PUT Update  (/Product/)
### DELETE Delete  (/Product/{_id})

# User
### POST Create  (/User)
### GET GetAll (/User?page=3)
### GET Get By Id (/User/{_id})
### PUT Update  (/User/)
### DELETE Delete  (/User/{_id})
### PATCH change password (User/)
### POST Signup (User/SignUp)
### POST SignIn (User/SignIn)


# Review
### POST Create  (/Review)
### GET GetAll (/Review?page=3)
### GET Get By Id (/Review/{_id})
### PUT Update  (/Review/)
### DELETE Delete  (/Review/{_id})



# Coupon
### POST Create  (/Coupon)
### GET GetAll (/Coupon?page=3)
### GET Get By Id (/Coupon/{_id})
### PUT Update  (/Coupon/)
### DELETE Delete  (/Coupon/{_id})

# Whishlist
### PATCH add to Whishlist  (/Whishlist)
### GET GetAll (/Whishlist?page=3)
### DELETE Remove From Whishlist (/Whishlist/{_id})


# adress
### PATCH add to adress  (/adress)
### GET GetAll (/adress?page=3)
### DELETE Remove From adress (/adress/{_id})


# cart
### POST Create  (/cart)
### GET GetAll (/cart?page=3)
### PUT Update  (/cart/)
### DELETE Delete  (/cart/{_id})


# cart
### POST chekout cash order (/order/{_id})
### POST chekout online order (/order/{_id})
### GET GetAll (/order?page=3)
### GET Get By Id (/order/{_id})







