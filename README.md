# Sing a song
Project where we can add our favorite song and link for youtube to listen whenever we want and even compare with other people who added their favorite songs. The comparison is made based on the score of the music, in that way, the songs with the higher score will be considered the most popular songs. Besides, if a song get a score of -5 or less, sadly, she'll be deleted from our system.

<br/>

## Use the api

The api is hosted on heroku in ```https://app-sing-a-song.herokuapp.com/```, but if you want to use locally, use these steps:
- Clone the project with
  ```
  git clone https://github.com/RuanFailache/sing-a-song.git
  ```

- Install the packages with
  ```
  npm i
  ```

- To run the api in your computer use
  ```
  npm start
  ```

## Routes

- ```/recommendations``` publish your song and link to youtube
- ```/recommendations/:id/upvote``` give a score point to a music
- ```/recommendations/:id/downvote``` decrease a score point from a music
- ```/recommendations/random``` get a random music from our database
- ```/recommendations/top/:amount``` get the X most popular songs