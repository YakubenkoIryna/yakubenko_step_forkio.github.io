$( "#btn-receitamob" ).click(function() {
    $("#receita-div").slideToggle(400, function () {
    });
    $(this).find("i").toggleClass(" fa fa-align-right  fa fa-times");
});