const canvas = document.getElementById('annotationCanvas');
const ctx = canvas.getContext('2d');
let img = new Image();
let clickCoords = { x: null, y: null };
let scale = 1;

img.src = 'bonobo body for wounding score.png';
img.onload = () => {
    canvas.width = img.width > 400 ? 400 : img.width;
    canvas.height = img.height * (canvas.width / img.width);
    drawImage();
};

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    clickCoords = { x, y };
    drawPoint(x, y);
});

function drawPoint(x, y) {
    ctx.save();
    ctx.scale(scale, scale);
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.fillText('*', x, y);
    ctx.restore();
}

document.getElementById('zoomIn').addEventListener('click', () => {
    scale += 0.2;
    drawImage();
});

document.getElementById('zoomOut').addEventListener('click', () => {
    if (scale > 0.4) scale -= 0.2;
    drawImage();
});

document.getElementById('aggressor').addEventListener('change', function() {
    document.getElementById('aggressorNames').style.display = this.checked ? 'inline' : 'none';
});

document.getElementById('management').addEventListener('change', function() {
    document.getElementById('managementDetails').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('submitWound').addEventListener('click', () => {
    const animalName = document.getElementById('animalName').value;
    const date = document.getElementById('date').value;
    const severity = document.getElementById('severity').value;
    const aggressor = document.getElementById('aggressor').checked ? 'Yes' : 'No';
    const aggressorNames = document.getElementById('aggressorNames').value;
    const management = document.getElementById('management').checked ? 'Yes' : 'No';
    const managementDetails = document.getElementById('managementDetails').value;
    const comments = document.getElementById('comments').value;
    const vetOptions = Array.from(document.querySelectorAll('.vetOption:checked')).map(opt => opt.value).join(', ');

    if (!animalName || !date || !severity || clickCoords.x === null) {
        alert('Please fill all fields and click on the wound location.');
        return;
    }

    alert('Wound submitted successfully!');
    clickCoords = { x: null, y: null };
});