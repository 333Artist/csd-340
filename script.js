//Looks for div elements from the html document
const box = document.getElementById('myBox');
const closeBtn = document.getElementById('closeBtn');
const minimizedIcon = document.getElementById('minimizedIcon');

// --- REUSABLE DRAG LOGIC ---
//Some basic physics here
function makeElementMoveable(element, isMainBox = false) {
    //Would this be a default constructor? But it passes arguments?
    let isDragging = false;
    let startX, startY;
    let initialX, initialY;
    let dragThreshold = 5;

    //once mousedown client events starts changing the default variables
    element.addEventListener('mousedown', (e) => {
        // If they clicked the close button inside the box, don't drag
        if (e.target === closeBtn) return;

        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        initialX = element.offsetLeft;
        initialY = element.offsetTop;

        // Use a persistent object to pass variables to the window-level listeners
        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            if (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold) {
                isDragging = true;
            }

            if (isDragging) {
                element.style.left = `${initialX + deltaX}px`;
                element.style.top = `${initialY + deltaY}px`;
            }
        };

        const onMouseUp = (upEvent) => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            // If it wasn't a drag, handle the click action
            if (!isDragging && upEvent.target !== closeBtn) {
                if (isMainBox) {
                    boxClickAction();
                } else {
                    restoreBox();
                }
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

// Make BOTH elements moveable
makeElementMoveable(box, true);        // Passed true because it's the main box
makeElementMoveable(minimizedIcon, false); // Passed false because it's the icon

// --- CLICK ACTION FOR MAIN BOX ---
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

// Separate function to restore the box (triggered inside makeElementMoveable on click)
function restoreBox() {
    // Pass the icon's current location back to the box
    box.style.left = `${minimizedIcon.offsetLeft}px`;
    box.style.top = `${minimizedIcon.offsetTop}px`;

    // Toggle visibility
    minimizedIcon.style.display = 'none';
    box.style.display = 'block';
}

//There's still a lot to learn
//