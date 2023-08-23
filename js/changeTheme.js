const changeBtton = document.querySelector('#changeTheme');
const body = document.querySelector('body');
changeBtton.addEventListener('click', change);

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}
function change() {
    body.classList.toggle('dark-theme');
    const isDarkTheme = body.classList.contains("dark-theme");
    console.log(isDarkTheme)
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}
