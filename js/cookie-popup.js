(function () {
    if (!localStorage.getItem('cookieconsent')) {
        document.body.innerHTML += '\
		<div class="cookieconsent animated fadeInUp" style="position:fixed;padding:10px;left:0;bottom:0;background-color:#000;color:#FFF;text-align:center;width:100%;z-index:99999; font-family: \'Libre Franklin\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;">\
			This site uses cookies. By continuing to use this website, you agree to their use. \
			<a href="#" style="color:#CCCCCC;">OK! I like cookies:)</a>\
		</div>\
		';
        document.querySelector('.cookieconsent a').onclick = function (e) {
            e.preventDefault();
            document.querySelector('.cookieconsent').style.display = 'none';
            localStorage.setItem('cookieconsent', true);
        };
    }
})();