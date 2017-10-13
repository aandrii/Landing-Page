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

    me.isValid = function() {
        if (!me.isAllCompleted(document.querySelectorAll('[data-valid="required"]'))) {
            console.log('fields is empty')
            return false;
        } else if (!validation.isEmail(document.querySelector('[data-email]').value)){
            console.log('field Email is incorect')
            return false;
        } else if (!validation.isNumber(document.querySelector('[data-number]').value)){
            console.log('field Number is incorect')
            return false;
        }
        return true;
    };

    me.isAllCompleted = function(data) {
        var result = true;

        for (var i = 0; i < data.length; i++) {
            if(!validation.isNotEmpty(data[i].value)) {
                
                result = false;                
                console.log('result ' + result);
                break;
               
            }
        }

        return result;
    };

    window.forma = me;
}());
