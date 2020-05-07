// readtime
!function (a) {
    a.fn.readtime = function (b) {
        var c = {"class": "readtime", format: "# min read", images: 12, wpm: 275, wrapper: "time"};
        return b = a.extend(c, b), this.each(function () {
            var c = this.textContent || this.innerText || "",
                d = c.replace(/(^\s*)|(\s*$)/gi, "").replace(/[ ]{2,}/gi, " ").replace(/\n /, "\n").split(" ").length,
                e = d / b.wpm * 60;
            b.images && (e += a(this).find("img").length * b.images), e = Math.round(e / 60), e = b.format.replace(/#/, e);
            var f = document.createElement(b.wrapper);
            a(f).addClass(b.class).html(e).prependTo(a(this))
        })
    }
}(jQuery);

$(document).ready(function () {
    $('.blog-post').readtime({
        class: 'readtime',   // Class name of the output element
        format: '◔ # min read', // # == the number of minutes
        images: 12,           // Seconds per image, false to disable
        wpm: 275,          // Words per minute, defaults to average
        wrapper: 'time'        // What the output will be wrapped in
    });
});