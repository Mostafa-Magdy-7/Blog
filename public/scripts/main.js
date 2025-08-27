$(function () {
  $("#Login").on("click", function (e) {
    e.preventDefault();
    console.log("shady");
    $("#signup").css("display", "none");
    $("#login").css("display", "flex");
  });
  $("#signUp").on("click", function (e) {
    e.preventDefault();
    $("#login").css("display", "none");
    $("#signup").css("display", "flex");
  });
  $(".deleteconf").on("click", function (e) {
    e.preventDefault();
    const postId = $(this).data("id");

    // Set form action dynamically
    $("#deleteForm").attr("action", `/post/${postId}/delete`);

    // Show popup
    $("#confirmPopup").css("display", "flex");
  });

  $(".cancel-btn").on("click", function () {
    $("#confirmPopup").hide();
  });
});
