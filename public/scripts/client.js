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
  const { user, content, created_at } = tweetData;
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  let $tweet = `<article class='tweet'>
      <header>
        <div class='user-info'>
          <img src="${user.avatars}">
          <p>${user.name}</p>
        </div>
        <p class='username'>${user.handle}</p>
      </header>
      <p class="tweet-display">${escape(content.text)}</p>
      <footer>
        <p>${timeago.format(created_at)}</p>
        <div class='tweet-icons'>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`;
  return $tweet;
};

const renderTweets = function (tweets) {

  for (let tweet of tweets) {       // loops through tweets
    const $tweet = createTweetElement(tweet)// calls createTweetElement for each tweet
    $('#tweets-container').prepend($tweet);  // takes return value and appends it to the tweets container

  }
};



$(document).ready(function () {

  $('form').submit(function (event) { //form submit using jQuery
    event.preventDefault();
    $('.counter-exceed').hide();
    $('.empty-tweet').hide();
    console.log("text-tweet:" + $(this).find('#tweet-text').val());
    console.log("text-tweet using html:" + document.getElementById("tweet-text").value);
    if ($(this).find('.counter').val() < 0) {
      //return alert('Tweet is too long!');
      $('.counter-exceed').slideDown();
      return;
    } else if (!$('#tweet-text').val()) {
      //return alert('Please enter the tweet');
      $('.empty-tweet').slideDown();
      return;
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