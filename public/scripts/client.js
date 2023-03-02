/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
     $("#tweets-container").prepend(tweetElement);
  }
}

const createTweetElement = function(tweet) {
    let $tweet = $("<article>").addClass("tweet");
    const html = `
      <header>
          <h4>${tweet.user.name}</h4>
          <h4>${tweet.user.handle}</h4>
        </header>
        <div>
          <form action="">
            <label for=""></label>
            <textarea name="" class="tweet-text" cols="30" rows="1">${tweet.content.text}</textarea>
          </form>
          <footer>
            <p>10 days ago</p>
            <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-retweet"></i>
            </div>
          </footer>
        </div>`;
    const tweetElement = $tweet.append(html); 
    return tweetElement;
  };

renderTweets(data);
})

