const m1btn = document.getElementById('mth1');
const m2btn = document.getElementById('mth2');
const m1Steps = document.querySelectorAll('.method1');
const m2Steps = document.querySelectorAll('.method2');
const step2 = document.getElementById('step2');
const step2Alt = document.getElementById('step2alt');
const copy = document.getElementById("copyCode");

document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch("../src/loader.js");
window.code = await response.text();
document.getElementById('ctaButton').href = code;

copy.addEventListener("click", async function () {
    navigator.clipboard.writeText(window.code).then(() => {
        copy.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copy.innerHTML = `<i class="fas fa-copy"></i> Copy Bookmarklet Code`;
        }, 1000);
    });
});
});

if (window.innerWidth <= 768) {
showMethod("method2")
  }

function showMethod(method) {
    if (method === 'method1') {
        m1Steps.forEach(step => step.style.display = 'block');
        m2Steps.forEach(step => step.style.display = 'none');
        step2Alt.style.display='none';
        m1btn.classList.add('active');
        m2btn.classList.remove('active');
    } else {
        m1Steps.forEach(step => step.style.display = 'none');
        m2Steps.forEach(step => step.style.display = 'block');
        m1btn.classList.remove('active');
        m2btn.classList.add('active');
    }
}

const container = document.querySelector('.video-container');
const ytApi = document.createElement('script');
ytApi.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(ytApi);
window.onYouTubeIframeAPIReady = () => {
    new YT.Player(document.querySelector('iframe'), {
        events: {
            onStateChange: event => {
                if (event.data == YT.PlayerState.PLAYING) {
                    container.classList.add('playing');
                } else if (event.data == YT.PlayerState.PAUSED) {
                    container.classList.remove('playing');
                }
            }
        }
    });
};

m1btn.addEventListener('click', () => showMethod('method1'));
m2btn.addEventListener('click', () => showMethod('method2'));

let togMethod = true
document.querySelectorAll('.togMethod').forEach(link => {
    link.addEventListener('click', () => {
        if (togMethod === true) {
            step2Alt.style.display = 'block';
            step2.style.display = 'none';
            togMethod = false
        } else {
            step2Alt.style.display = 'none';
            step2.style.display = 'block';
            togMethod = true
        }
    });
});

