// var g = G$('Roei', 'Oren');

// g.greet().setLang('es').greet(true);

$('#login').click(function() {

    var loginGrtr = G$('Roei', 'Oren');

    $('#logindiv').hide();

    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

})