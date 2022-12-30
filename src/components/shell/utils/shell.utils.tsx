export function openSideNav() {
    const sideNav: HTMLElement = document.querySelector('.sidenav-container')!;
    sideNav.style.left = "0px";
}

export function closeSideNav() {
    const sideNav: HTMLElement = document.querySelector('.sidenav-container')!;
    sideNav.style.left = "-225px";
}