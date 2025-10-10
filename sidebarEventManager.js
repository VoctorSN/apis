
let sideBarIsOpen = false;

// Toggle del menú lateral
document.getElementById('menuToggle').addEventListener('click', function () {
    sideBarIsOpen = !sideBarIsOpen
    setSideBar()
});

function setSideBar() {
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