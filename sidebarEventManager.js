
let sideBarIsOpen = false;

// Toggle del menú lateral
document.getElementById('menuToggle').addEventListener('mouseenter', function () {
    sideBarIsOpen = !sideBarIsOpen
    setSideBar()
});

function setSideBar() {
    console.log("setting sidebar to " + sideBarIsOpen);

    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    if (!sideBarIsOpen) {

        sidebar.classList.add('closed');
        body.classList.add('menu-closed');
    } else {

        sidebar.classList.remove('closed');
        body.classList.remove('menu-closed');
    }
}

setSideBar()