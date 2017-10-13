(function () {
    var openFormButton = document.querySelector('.arrowDown');
    var form = document.querySelector('.form');


    if (openFormButton) {
        openFormButton.addEventListener('click', function(e) {
            e.preventDefault();
            forma.open();
        })
    };

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (forma.isValid()) {
                 console.log('All good');
            } else {
                console.log('Is not valid')
            }

        })
    }

    console.log(openFormButton);
} ());