document.getElementById('copyButton').addEventListener('click', function() {
    const menuItems = document.querySelectorAll('#menu li');
    const paragraph = document.getElementById('paragraph');
    menuItems.forEach(item => {
        paragraph.innerHTML += ` ${item.textContent}`;
    });
});

document.getElementById('styleButton').addEventListener('click', function() {
    const elements = document.querySelectorAll('.highlight');
    elements.forEach(element => {
        element.style.color = 'red';
    });
});

document.getElementById('searchButton').addEventListener('click', function() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const menuItems = document.querySelectorAll('#menu li');
    menuItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchText)) {
            item.classList.add('highlight');
        } else {
            item.classList.remove('highlight');
        }
    });
});
