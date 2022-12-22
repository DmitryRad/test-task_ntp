const button = document.getElementById('button');

let data;

const initialPage = window.location.pathname.split('/');
const page = initialPage.find(el => el === 'index.html');

// Условие убирает ссылку с главной страницы (index.html).
if (page === 'index.html') {
    document.querySelector('a').removeAttribute('href');
}

// Функция получает данные из JSON файла.
function loadDate() {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        button.parentNode.removeChild(button);
        if (xhr.status != 200) {
            // обработать ошибку
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            try {
                data = JSON.parse(xhr.responseText);
            } catch (e) {
                alert("Некорректный ответ " + e.message);
            }
            showData(data);
        }
    }
    xhr.send();

    button.innerHTML = 'Загружаю...';
    button.disabled = true;
}

// Функция отображения полученных данных в виде таблицы и графика.
function showData(data) {
    const table = document.getElementById('table');
    table.appendChild(document.createElement('tr'));
    table.appendChild(document.createElement('th')).innerHTML = "Date";
    table.appendChild(document.createElement('th')).innerHTML = "Price";
    table.appendChild(document.createElement('th')).innerHTML = "Volume";
    data.forEach(function(data) {
        table.appendChild(document.createElement('tr'));
        let date = table.appendChild(document.createElement('td'));
        date.innerHTML = data.Date;
        let price = table.appendChild(document.createElement('td'));
        price.innerHTML = data.Price;
        let volume = table.appendChild(document.createElement('td'));
        volume.innerHTML = data.Volume;
    });

    const ctx = document.getElementById('myChart');
    const labels = data.map(item => item.Date);
    const datasets = data.map(item => item.Price);
    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Information',
                data: datasets,
                fill: 'stack',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    }

    let chart = new Chart(ctx, config)
}