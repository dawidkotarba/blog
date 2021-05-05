(function () {
    if (!localStorage.getItem('cookieconsent')) {
        document.body.innerHTML += '\
		<div class="cookiePopup cookieconsent animated fadeInUp">\
			This site uses cookies. By continuing to use this website, you agree to their use. <a href="#" class="cookieBtn">OK! I like cookies:)</a>\
		</div>\
		';
        document.querySelector('.cookieconsent a').onclick = function (e) {
            e.preventDefault();
            document.querySelector('.cookieconsent').style.display = 'none';
            localStorage.setItem('cookieconsent', true);
        };
    }
})();