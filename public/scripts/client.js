/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227

  }
  const createTweetElement = function (tweetData) {
    const tweet = $(`<article class='tweet'>
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
  const $tweet = createTweetElement(tweetData);

  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
