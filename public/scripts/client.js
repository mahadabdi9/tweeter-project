/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {


  const loadTweets = function () {
    $.ajax("/tweets").then(function (response) {
      renderTweets(response);
    });
  };
  loadTweets();
  $(".error").hide();


  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
       $("#tweets-container").prepend(tweetElement);
    }
  }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


const createTweetElement = function(tweet) {
    let $tweet = $("<article>").addClass("tweet");
    const html = `
        <header>
          <div class="avatar-username">
          <img class="tweet--avatar" src="${tweet.user.avatars}"> 
          <h4>${tweet.user.name}</h4>
          </div>
          <h4>${tweet.user.handle}</h4>
        </header>
        <div>
          <form action="">
            <label for=""></label>
            <textarea name="" class="tweet-text" cols="30" rows="1">${escape(tweet.content.text)}</textarea>
          </form>
          <footer>
          ${timeago.format(tweet.created_at)}
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



  $("#tweetForm").on("submit", function(event) {
    event.preventDefault();
    const tweetArea = $(".tweet-text").val().trim().length;
    if (!tweetArea) {
      $(".error").text("Tweet Area cannot be empty");
      $(".error").slideDown("slow")
      $(".error").delay(4000).slideUp("slow");

      return;
    }
    if (tweetArea > 140) {
      $(".error").text("Tweet cannot be more than 140 characters‼️");
      $(".error").slideDown("slow")
      $(".error").delay(4000).slideUp("slow");

      return;
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function() {
        loadTweets();
        $(".tweet-text").val("")
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus + ': ' + errorThrown);
      }
    });


})

})

