let tan = document.getElementById("tan");
let pink = document.getElementById("pink");
let purple = document.getElementById("purple");
let showCoords = document.getElementById("showCoords");
let state = document.getElementById("state");

let irises = document.getElementsByClassName("iris");

for (let i = 0; i < irises.length; i++) {
    irises[i].onmousedown = go;
}

let irisesState = [];

for (let i = 0; i < irises.length; i++) {
    irisesState[irises[i].id] = false;
}

// console.log(irisesState);

//проверка, попадает ли на поле f цветок с координатами left, top
function onField(f, left, top) {
    let field = getCoords(f); // получили координаты top и left, а также width и height текущего поля f

    if (
        left > field.left &&
        left < field.left + field.width &&
        top > field.top &&
        top < field.top + field.height &&
        (f == tan || f == pink || f == purple)
    )
        return true;
    return false;
}

function go(event) {
    let flower = document.getElementById(event.target.id);
    let breed = flower.dataset.breed;
    let coords = getCoords(flower)
        ;
    let shiftX = event.pageX - coords.left;
    let shiftY = event.pageY - coords.top;

    moveAt(event);

    // функция перемещения объекта под координаты курсора
    function moveAt(event) {
        // сдвиг курсора на shiftX и shiftY относительно верхнего левог7о угла
        let left = event.pageX - shiftX;
        let top = event.pageY - shiftY;

        flower.style.left = left + "px";
        flower.style.top = top + "px";
        showCoords.innerHTML = `x: ${flower.style.left}, y: ${flower.style.top}`;

        if (onField(tan, left, top)) {
            if (breed == "tan") {
                tan.style.border = "2px solid green";
                pink.style.border = "none";
                purple.style.border = "none";
            } else {
                tan.style.border = "2px solid red";
                pink.style.border = "none";
                purple.style.border = "none";
            }
        }
        if (onField(pink, left, top)) {
            if (breed == "pink") {
                pink.style.border = "2px solid green";
                tan.style.border = "none";
                purple.style.border = "none";
            } else {
                pink.style.border = "2px solid red";
                tan.style.border = "none";
                purple.style.border = "none";
            }
        }

        if (onField(purple, left, top)) {
            if (breed == "purple") {
                purple.style.border = "2px solid green";
                tan.style.border = "none";
                pink.style.border = "none";
            } else {
                purple.style.border = "2px solid red";
                tan.style.border = "none";
                pink.style.border = "none";
            }
        }
    }

    // событие перемещения мыши
    document.onmousemove = function (event) {
        moveAt(event);
    };

    // событие  отпускания мыши
    flower.onmouseup = function (event) {
        res(event);
    };

    function res(event) {
        irisesState[flower.id] = false; // сброс состояния текущего цветка
        tan.style.border = "none";
        pink.style.border = "none";
        purple.style.border = "none";

        // let left1 = parseInt(flower.style.left);
        // alert(left1);

        let left = parseInt(flower.style.left);
        let top = parseInt(flower.style.top);

        if (onField(tan, left, top)) {
            if (breed == "tan") {
                irisesState[flower.id] = true;
            }
            else {
                irisesState[flower.id] = false;
            }

        }

        if (onField(pink, left, top)) {
            if (breed == "pink") {
                irisesState[flower.id] = true;
            }
            else {
                irisesState[flower.id] = false;
            }
        }

        if (onField(purple, left, top)) {
            if (breed == "purple") {
                irisesState[flower.id] = true;
            }
            else {
                irisesState[flower.id] = false;
            }
        }

        //..... проверить поле pink

        //реализовать - если цветок находится на своем поле, то  irisesState[flower.id] = true, иначе - irisesState[flower.id] = false

        // console.log(irisesState);
        document.onmousemove = null;
        flower.onmouseup = null;
    }

    flower.ondragstart = function () {
        return false; // отмена drag and drop браузера
    };
}

// функция возвращает размер элемента и его координаты относительно объемлющего элемента.
function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    //scrollX и scrollY возвращают скроллирование окна в пикселях
    return {
        height: box.height,
        width: box.width,
        top: box.top + scrollY,
        left: box.left + scrollX,
    };
}

function check() {
    let res1 = false;
    // for (let i = 0; i < irisesState.length; i++) {
    for (let key in irisesState) {
        if (irisesState[key] == false) {
            res1 = false;
            // console.log(irisesState[key]);
            state.style.color = "red";
            state.style.backgroundColor = "pink";
            break;
        }
        else {
            res1 = true;
        }

    }
    // console.log(irisesState[0]);

    if (res1 == false) {
        state.innerHTML = "Error!";
    }
    else {
        state.style.color = "green";
        state.style.backgroundColor = "lightgreen";
        state.innerHTML = "OK";
    }

    // Проверка, все ли ирисы на своем поле
    // реализовать - если в массиве irisesState хотя бы одно значение false, то выдавать сообщение "Error", если все true - то "OK". Сообщение писать в state
}