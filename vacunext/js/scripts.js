/* Description: Custom JS file */

/* Navigation*/
// Collapse the navbar by adding the top-nav-collapse class
window.onscroll = function () {
	scrollFunction();
	
};

window.onload = function () {
	scrollFunction();
	$('#submit-button').on('click', () => {
		checkForm();
	});
};

let checkForm = () => {
	let emailCheck = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

	let sendAllowed = true;

	if($('#name').val() == '') {
	 	$('#name').next('.error-message').css('display', 'block');
		sendAllowed = false;
	} else {
		$('#name').next('.error-message').css('display', 'none');
	}
	
	if($('#email').val() == '') {
		$('#email').next('.error-message').css('display', 'block').text('Campo richiesto');
		sendAllowed = false;
    } else if(!emailCheck.test($('#email').val())) {
		$('#email').next('.error-message').css('display', 'block').text('Formato non valido');
		sendAllowed = false;
	} else {
		$('#email').next('.error-message').css('display', 'none');
	}

	if($('#subject').val() == '') {
		$('#subject').next('.error-message').css('display', 'block');
		sendAllowed = false;
    } else {
		$('#subject').next('.error-message').css('display', 'none');
	}

	if($('#message').val() == '') {
		$('#message').next('.error-message').css('display', 'block');
		sendAllowed = false;
    } else {
		$('#message').next('.error-message').css('display', 'none');
	}

	if(!($('#data-sharing-acceptance').is(':checked'))) {
		$('#data-sharing-acceptance').parent().next('.error-message').css('display', 'block');
		sendAllowed = false;
	} else {
		$('#data-sharing-acceptance').parent().next('.error-message').css('display', 'none');
	}

	if (sendAllowed) {
		sendMail($('#name').val(), $('#email').val(), $('#subject').val(), $('#message').val(), $('#phone').val());
	}
}

let sendMail = (name, email, subject, message, phone) => {
	let request = sendRequest('POST', 'forms/contact.php', {
		'name': name,
		'email': email,
		'subject': subject,
		'message': message,
		'phone': phone
	});
	request.done((data) => {
		$('.alert-box').fadeIn(250);
		if (data.result == 'sent') {
			$('.alert-box').text(data.message).css('background-color', 'limegreen');
		} else {
			$('.alert-box').text(data.message).css('background-color', '#ee2f2c');
		}
		$('#name').val('');
		$('#email').val('');
		$('#phone').val('');
		$('#subject').val('');
		$('#message').val('');
		$('#data-sharing-acceptance').click();
		setTimeout(() => {
			$('.alert-box').fadeOut(250);
		}, 5000);
	});
	request.fail(error);
}

function scrollFunction() {
	if (document.documentElement.scrollTop > 30) {
		document.getElementById('navbarExample').classList.add('top-nav-collapse');
	} else if ( document.documentElement.scrollTop < 30 ) {
		document.getElementById('navbarExample').classList.remove('top-nav-collapse');
	}
}

// Navbar on mobile
let elements = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');

for (let i = 0; i < elements.length; i++) {
	elements[i].addEventListener('click', () => {
		document.querySelector('.offcanvas-collapse').classList.toggle('open');
	});
}

document.querySelector('.navbar-toggler').addEventListener('click', () => {
  	document.querySelector('.offcanvas-collapse').classList.toggle('open');
});

// Hover on desktop
function toggleDropdown(e) {
	const _d = e.target.closest('.dropdown');
	let _m = document.querySelector('.dropdown-menu', _d);

	setTimeout(
		function () {
		const shouldOpen = _d.matches(':hover');
		_m.classList.toggle('show', shouldOpen);
		_d.classList.toggle('show', shouldOpen);

		_d.setAttribute('aria-expanded', shouldOpen);
		},
		e.type === 'mouseleave' ? 300 : 0
	);
}

// On hover
const dropdownCheck = document.querySelector('.dropdown');

if (dropdownCheck !== null) { 
	document.querySelector('.dropdown').addEventListener('mouseleave', toggleDropdown);
	document.querySelector('.dropdown').addEventListener('mouseover', toggleDropdown);

	// On click
	document.querySelector('.dropdown').addEventListener('click', (e) => {
		const _d = e.target.closest('.dropdown');
		let _m = document.querySelector('.dropdown-menu', _d);
		if (_d.classList.contains('show')) {
			_m.classList.remove('show');
			_d.classList.remove('show');
		} else {
			_m.classList.add('show');
			_d.classList.add('show');
		}
	});
}
  

/* Card Slider - Swiper */
var cardSlider = new Swiper('.card-slider', {
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	slidesPerView: 2,
	spaceBetween: 70,
	breakpoints: {
		// when window is <= 991px
		991: {
			slidesPerView: 1
		}
	}
});





