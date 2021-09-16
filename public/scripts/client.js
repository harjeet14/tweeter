/*
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]



//returns tweet <article> element containing the entire HTML structure of the tweet
const createTweetElement = function (tweetData) {
  console.log("inside createTweetElement. tweetData:" + tweetData);
  let tweet = $(`<article class='tweet'>
      <header>
        <div class='user-info'>
          <img src="${tweetData.user.avatars}">
          <p>${tweetData.user.name}</p>
        </div>
        <p class='username'>${tweetData.user.handle}</p>
      </header>
      <p class="tweet-display">${tweetData.content.text}</p>
      <footer>
        <p>${timeago.format(tweetData.created_at)}</p>
        <div class='tweet-icons'>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`)
  return tweet;
};

const renderTweets = function (tweets) {
  console.log("in the render tweet");
  for (let tweet of tweets) {       // loops through tweets
    console.log("inside individual tweet");
    const $tweet = createTweetElement(tweet)// calls createTweetElement for each tweet
    $('#tweets-container').append($tweet);  // takes return value and appends it to the tweets container

  }
};



$(document).ready(function () {

  $('form').submit(function (event) { //form submit using jQuery
    event.preventDefault();
    console.log("text-tweet:" + $(this).find('#tweet-text').val());
    console.log("text-tweet using html:" + document.getElementById("tweet-text").value);
    if ($(this).find('.counter').val() < 0) {
      return alert('Tweet is too long!');
    } else if (!$('#tweet-text').val()) {
      return alert('Please enter the tweet');
    }
    const data = $(this).serialize();
    $.post('/tweets', data)
      .then(function () {
        $('#tweets-container').empty();
        loadTweets();
        $('form').find('#tweet-text').val('');
        $('form').find('.counter').val(140);
      });
  });

  const loadTweets = function () {
    console.log('Performing ajax GET call...');
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweetData) {
        console.log('Success: ', tweetData);
        renderTweets(tweetData);

      });
  };
  loadTweets();
});