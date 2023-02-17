let isClassFixed = false;

function fixClassName() {
    if (document.getElementsByClassName("ytp-bezel-text-hide")[0]) {
        document.getElementsByClassName("ytp-bezel-text-hide")[0].className = "ytp-bezel-text";
        isClassFixed = true;
    }
}

// view processing
function showInformation(msg) {
    fixClassName();
    let index = isClassFixed ? 1 : 0;
    document.querySelectorAll('div[data-layer="4"]')[4].style = '';
    document.getElementsByClassName('ytp-bezel-text')[index].innerHTML = msg;
    document.querySelectorAll('div[role="status"]')[0].style = 'display: none;'

    setTimeout(function () {
        document.querySelectorAll('div[data-layer="4"]')[4].style = 'display: none;';
        document.getElementsByClassName('ytp-bezel-text')[index].innerHTML = '';
        document.querySelectorAll('div[role="status"]')[0].style = ''
    }, 700);
}


let currentPlaybackRate = 1;
// save playbackRate state during url changing
(function () {
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(mutations => {
        mutations.forEach(() => {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                document.getElementsByTagName('video')[0].playbackRate = currentPlaybackRate
            }
        });
    });
    observer.observe(body, {childList: true, subtree: true});
})();
// shortcuts processing
let isShowing = true;
document.onkeyup = function (e) {
    if (e.ctrlKey && e.code === 'Quote') { // ctrl + ' shortcut
        let display = isShowing ? "none" : "block";
        isShowing = !isShowing;
        for (const className of [
            "ytp-chrome-bottom", "ytp-gradient-bottom",
            "ytp-chrome-top", "ytp-gradient-top",
            "annotation annotation-type-custom iv-branding"
        ]) {
            for (const e of document.getElementsByClassName(className)) {
                e.style.display = display;
            }
        }
        let msg = "Menu is " + (isShowing ? "on" : "off");
        showInformation(msg)
        console.log(`"CTRL" + "'" shortcut was pressed\n${msg}`);
    }

    if (e.ctrlKey && e.code === 'Period') { // ctrl + . shortcut
        currentPlaybackRate += 0.25
        document.getElementsByTagName('video')[0].playbackRate = currentPlaybackRate

        showInformation(`${currentPlaybackRate}x`)
        console.log(`"CTRL" + "." shortcut was pressed\nVideo speed increased by 0.25 (current: ${currentPlaybackRate})`);
    }
    if (e.ctrlKey && e.code === 'Comma') { // ctrl + , shortcut
        currentPlaybackRate -= 0.25
        document.getElementsByTagName('video')[0].playbackRate = currentPlaybackRate

        showInformation(`${currentPlaybackRate}x`)
        console.log(`"CTRL" + "," shortcut was pressed\nVideo speed decreased by 0.25 (current: ${currentPlaybackRate})`);
    }
};
