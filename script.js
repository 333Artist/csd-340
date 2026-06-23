const box = document.getElementById('myBox');
const closeBtn = document.getElementById('closeBtn');
const minimizedIcon = document.getElementById('minimizedIcon');

let isDragging = false;
let startX, startY;
let initialX, initialY;
let dragThreshold = 5;

// --- DRAG & CLICK LOGIC FOR THE BOX ---
box.addEventListener('mousedown', (e) => {
    // If they clicked the close button, don't start a drag
    if (e.target === closeBtn) return;

    isDragging = false;
    startX = e.clientX;
    startY = e.clientY;
    initialX = box.offsetLeft;
    initialY = box.offsetTop;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    if (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold) {
        isDragging = true;
    }

    if (isDragging) {
        box.style.left = `${initialX + deltaX}px`;
        box.style.top = `${initialY + deltaY}px`;
    }
}

function onMouseUp(e) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (!isDragging && e.target !== closeBtn) {
        boxClickAction();
    }
}

function boxClickAction() {
    console.log("Box body clicked!");
}

// --- MINIMIZE & RESTORE LOGIC ---

// Click X to minimize
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stops the box click action from firing

    // Pass the box's current location to the icon
    minimizedIcon.style.left = `${box.offsetLeft}px`;
    minimizedIcon.style.top = `${box.offsetTop}px`;

    // Toggle visibility
    box.style.display = 'none';
    minimizedIcon.style.display = 'flex';
});

// Click the icon to restore
minimizedIcon.addEventListener('click', () => {
    // Pass the icon's current location back to the box (in case you make the icon moveable later)
    box.style.left = `${minimizedIcon.offsetLeft}px`;
    box.style.top = `${minimizedIcon.offsetTop}px`;

    // Toggle visibility
    minimizedIcon.style.display = 'none';
    box.style.display = 'block';
});