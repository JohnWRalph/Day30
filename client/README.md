Day29: Real-world data structuring

HOMEWORK:
Create a new Svelte app with vite, and a new Express app, and put them in the client and server folders respectively, as we've been doing. Use DaisyUI and Tailwind if you like!
Create a User model with id, username, and email properties. Use the uuid npm package to create unique IDs for your models.
Add a fireStore (or supabase, whatever database you like to use) config to your project. 
Create one svelte form to create a user, with two inputs for username and email.
Create four express handler routes: a /user .post to create a new user, a  /user/:id .put which can update the user by ID, a .get /user to fetch all users, and a /user/:id .get to get a user by ID.
Create a svelte page (and button to get there) that displays all users in a list. After clicking a user, you should be taken to a third page which lets you edit that user's 
username or email address via a form, which you can complete because you know the ID of the user from selecting it in the list.

Deploy both the client and the server to vercel.