(function ($) {
    'use strict';
    var form = $('.php-email-form'),
        message = $('.contact-msg'),
        form_data;

    function done_func(response) {
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 5000);
        form.find('input:not([type="submit"]), textarea').val('');
		$("[name='data-sharing-acceptance']").prop("checked", false);
    }

    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-danger');
        message.text(data.responseText);
        setTimeout(function () {
            message.fadeOut();
        }, 5000);
    }
    
    form.submit(function (e) {
		e.preventDefault();
		form_data = $(this).serialize();
		$.ajax({
			type: 'POST',
			url: form.attr('action'),
			data: form_data
		})
		.done(done_func)
		.fail(fail_func);
    }); 
})(jQuery);