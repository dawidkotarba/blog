AOS.init();

// hide go up button on mobile
if (window.isMobile()) {
    $('.progress-wrap').css('display', 'none');
}

function navigateTo(url) {
    window.location.href = url;
}