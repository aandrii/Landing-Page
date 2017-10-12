(function () {
    var openFormButton = document.querySelector('.arrowDown');


    if (openFormButton) {
        openFormButton.addEventListener('click', function(e) {
            e.preventDefault();
            forma.open();
        })
    };

    console.log(openFormButton);
} ());