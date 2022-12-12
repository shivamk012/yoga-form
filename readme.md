Technologies Used : React Js , Node Js , MongoDB , Express , Mongoose , Axios

According to the problem statement , the user have to fill the form then proceed to payment. Once the user have decided the batch he/she cannot change it. So a authentication system is 
required to check whether a user has submitted the batch or not. 

I built a simple username, password based authentication system. Two users can be differentiated using username so username is like a primary key to the user database. 
I used bcrypt library for encrytion and decryption of password. I used express js for building restful api's , mongoose for connecting , quering to database , axios for api calls.

Once the payment is done and if a user tries to fill the form again he/she will get the message that this month payment is done and this can be done using simple findOne query in mongoDB.

Various features like checking is user already registered or is user present is data base or not can be done using findOne query in mongoDB.

Api's used - 
1) POST http://localhost:8000/api/login
   This is a post request which is used then user is trying to log in. At first , a check whether user is present or not using findOne query in mongoDb is done and if user is not registered
   it is shown on screen and if user is registered using bcrpyt compare method a check is done whether password is matched or not and user is redirected to form if matched otherwise a 
   error message is shown.

2 ) POST http://localhost:8000/api/signup
    This request is used to add the user to existing database.

3 ) POST  http://localhost:8000/api/yoga-form
    This request is used to send the form details once user clicks submit button of the form.

4 ) GET http://localhost:8000/api/user-detail
    This request is used to check whether a user has filled the form before in the present month or not. When the user has logged in and the yoga-form is first loaded , using useEffect hook
    a request to this api is made. Username is sent in the query parameter of this api url and after fetching username from query parameter , using findOne query I check whether user has a
    data entry in forms database and if user is present before a message is shown to user that you have made payment for this month or else if user is not found then form is shown.

Using node-cron library , at the start of every month all the forms are refreshed and then user can again fill his / her form.
