
const step2 = document.getElementById('step2');
const step2Alt = document.getElementById('step2alt');
const copy = document.getElementById("copyCode");

document.addEventListener('DOMContentLoaded', async function () {
const response = await fetch("/instructions/loader.js");
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

