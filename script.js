let isClassFixed = false;

function fixClassName() {
    if (document.getElementsByClassName("ytp-bezel-text-hide")[0]) {
        document.getElementsByClassName("ytp-bezel-text-hide")[0].className = "ytp-bezel-text";
        isClassFixed = true;
    }
}

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


let isShowing = true;
let currentPlaybackRate = 1;

document.onkeyup = function (e) {
    if (e.altKey && e.code === 'Quote') { // alt + ' shortcut
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
        console.log(`"ALT" + "'" shortcut was pressed\n${msg}`);
    }

    // todo: limits
    if (e.altKey && e.code === 'Period') { // alt + . shortcut
        currentPlaybackRate += 0.25
        document.getElementsByTagName('video')[0].playbackRate = currentPlaybackRate

        showInformation(`${currentPlaybackRate}x`)
        console.log(`"ALT" + "." shortcut was pressed\nVideo speed increased by 0.25 (current: ${currentPlaybackRate})`);
    }
    if (e.altKey && e.code === 'Comma') { // alt + , shortcut
        currentPlaybackRate -= 0.25
        document.getElementsByTagName('video')[0].playbackRate = currentPlaybackRate

        showInformation(`${currentPlaybackRate}x`)
        console.log(`"ALT" + "," shortcut was pressed\nVideo speed decreased by 0.25 (current: ${currentPlaybackRate})`);
    }
};
