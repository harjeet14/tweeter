/*
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
    $('#tweets-container').prepend($tweet);  // takes return value and prepends it to the tweets container

  }
};



$(document).ready(function () {

  $('form').submit(function (event) {   //form submit using jQuery
    event.preventDefault();
    $('.counter-exceed').hide();
    $('.empty-tweet').hide();

    if ($(this).find('.counter').val() < 0) {
      $('.counter-exceed').slideDown();
      return;
    } else if (!$('#tweet-text').val()) {
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

  const loadTweets = function () { //get tweets and rendor them
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweetData) {
        renderTweets(tweetData);
      });
  };
  loadTweets();
});