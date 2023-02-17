Day30:
- Add a password, and passowrd hashing via either bcrypt or argon2, to your express user creation route!
- Add a post /login route a user can use to login, verify the password is correct, and receive a JWT!
- Add JWT verification to your PUT /user route so only logged in users can edit their own user!
- add a Login page to your client that stores the JWT to localStorage if the password is correct
- Update the client to use these routes, and for editign the user, get the JWT out of  local storage when they try to update the form, setting it as a Authorization request header in the form: Bearer $token}.