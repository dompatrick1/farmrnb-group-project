# FarmRnB
<img width="959" alt="farmrnb-splash" src="https://user-images.githubusercontent.com/72318026/121571012-7e1b8980-c9f0-11eb-806c-f6ad7e8d0f83.PNG">
FarmRnB is a fun AirBnB inspired clone which gives users a unique opportunity to book stays at a wide variety of farms and wineries. Users will be able to go through the experience of life at these types of establishments and truly know what goes into making their favorite foods and products! 

See FarmRnB live [here](https://farmrnb.herokuapp.com/)

## Technologies

* Backend: Python / Flask / SQLAlchemy / PostgreSQL
* Frontend: React / Redux
* Google Maps API for rendering a map for a more enjoyable user experience

## Main Features

Account creation, log in, log out, and guest/demo login
<img width="946" alt="farmrnb-login" src="https://user-images.githubusercontent.com/72318026/121575992-f8024180-c9f5-11eb-95d4-002db647d176.PNG">

Filtered Search using Redux State Management
<img width="945" alt="farmrnb-search" src="https://user-images.githubusercontent.com/72318026/121576734-adcd9000-c9f6-11eb-813a-e0677f6c212b.PNG">

Users are able to make a reservation for their establishment of choice

<img width="359" alt="farmrnb-res" src="https://user-images.githubusercontent.com/72318026/121577348-6d224680-c9f7-11eb-9aa2-afe088f241c2.PNG">

Review submission, edit, and delete for each individual farm

<img width="321" alt="farmrnb-review" src="https://user-images.githubusercontent.com/72318026/121577373-73182780-c9f7-11eb-99c6-12fe64a64529.PNG">

# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone 
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

