(function() {
    var me = {};

    var form = document.querySelector('.formContainer');
    var closeButton = null;

    onClose = function (e) {
        e.preventDefault();
        me.close();

        closeButton.removeEventListener('click', onClose);
    };

    me.open = function() {
        form.classList.remove('isHidden');

        closeButton = document.querySelector('.formCloseButton');
        closeButton.addEventListener('click', onClose)
    };

    me.close = function() {
        form.classList.add('isHidden');
    };

    window.forma = me;
}());
