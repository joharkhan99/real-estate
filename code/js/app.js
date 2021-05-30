// loader
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};
// loader end

function openTab(evt) {
    var i, tabcontent, tablinks;
    // tabcontent = document.getElementsByClassName("tabcontent");
    // for (i = 0; i < tabcontent.length; i++) {
    //     tabcontent[i].style.display = "none";
    // }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
};

//price accordian
function toggle_tabs(btn_id, tab_id, second_tab, second_btn_id) {
    var btn = document.getElementById("" + btn_id + "");
    var tab = document.getElementById("" + tab_id + "");

    if (tab.style.display === "block") {
        tab.style.display = "none";
        btn.classList.toggle('active-tab');

        if (tab.id == "price-filter-tab") {
            toggle_price_amount();
        } else if (tab.id == "size-filter-tab") {
            toggle_size_amount();
        }

    } else {
        document.getElementById("" + second_tab + "").style.display = "none";
        document.getElementById("" + second_btn_id + "").classList.remove('active-tab');

        tab.style.display = "block";
        btn.classList.toggle('active-tab');
    }
};

function btn_toggle_tab(btn_id, tab_id) {
    var btn = document.getElementById("" + btn_id + "");
    var tab = document.getElementById("" + tab_id + "");

    btn.classList.toggle('active-tab');
    tab.style.display = "none";
    if (tab.id == "price-filter-tab") {
        toggle_price_amount();
    } else if (tab.id == "size-filter-tab") {
        toggle_size_amount();
    }
};

function toggle_price_amount() {
    var min = document.querySelector('.range_min');
    var max = document.querySelector('.range_max');
    var output = document.querySelector('#price-range');

    output.innerHTML = "Rs " + min.textContent + " - " + max.textContent + '<i class="fas fa-chevron-down"></i>';
};

function toggle_size_amount() {
    var min = document.querySelector('.size_range_min');
    var max = document.querySelector('.size_range_max');
    var output = document.querySelector('#size-range');
    var unit = document.getElementById('areaUnit').value;


    output.innerHTML = min.textContent + " - " + max.textContent + " " + unit + '<i class="fas fa-chevron-down"></i>';
};

function changeUnitValues() {
    var unit = document.getElementById('areaUnit').value;
    switch (unit) {
        case "marla":
            changeValues(1, 50);
            break;
        case "kanal":
            changeValues(1, 100);
            break;
        case "sqft":
            changeValues(100, 11250);
            break;
        case "sqyd":
            changeValues(40, 4000);
            break;
        case "sqm":
            changeValues(100, 51000);
            break;
        case "acre":
            changeValues(1, 25);
            break;

        default:
            break;
    }
};

// change size values according to unit
function changeValues(min_val, max_val) {
    var size_range_min = document.querySelector('.size_range_min');
    var size_range_max = document.querySelector('.size_range_max');
    var size_min = document.querySelector('.size_min');
    var size_max = document.querySelector('.size_max');

    size_range_min.textContent = min_val;
    size_range_max.textContent = max_val;

    size_min.min = min_val;
    size_min.max = max_val;
    size_min.value = min_val;

    size_max.min = min_val;
    size_max.max = max_val;
    size_max.value = max_val;
}

// projects

// next,previous tbsn
(function () {
    function next_prev_btns(btn_id, items_id) {
        $("." + btn_id).click(function () {
            var box = $("." + items_id), x;
            if ($(this).hasClass("right")) {
                x = ((box.width() / 2)) + box.scrollLeft();
                box.animate({
                    scrollLeft: x,
                })
            } else {
                x = ((box.width() / 2)) - box.scrollLeft();
                box.animate({
                    scrollLeft: -x,
                })
            }
        });
    };

    function slide_grab_scroll(items_id) {
        const slider = document.querySelector('.' + items_id);
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    next_prev_btns("proj-arrow", "project-items");
    next_prev_btns("properties-arrow", "properties-items");
    next_prev_btns("team-arrow", "team-items");
    next_prev_btns("partner-arrow", "partner-items");
    slide_grab_scroll("project-items");
    slide_grab_scroll("team-items");
    slide_grab_scroll("properties-items");
    slide_grab_scroll("partner-items");

})();

function auto_slides(items_id) {
    var box = $("." + items_id), x;
    var x = ((box.width() / 2)) + box.scrollLeft();
    box.animate({
        scrollLeft: x,
    });
};

setInterval(() => {
    auto_slides("project-items");
    auto_slides("team-items");
    plusSlides(1);
    setTimeout(() => {
        auto_slides("partner-items");
        auto_slides("properties-items");
    }, 500);
}, 5000);

// why us
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = $(".why-us-items .item");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
};


// slider
(function () {

    function addSeparator(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    // price range
    function rangeInputChangeEventHandler(e) {
        var rangeGroup = $(this).attr('name'),
            minBtn = $('.min'),
            maxBtn = $('.max'),
            range_min = $('.range_min'),
            range_max = $('.range_max'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;

        if (origin === 'min' && minVal > maxVal - 1) {
            $(minBtn).val(maxVal - 1);
        }
        var minVal = parseInt($(minBtn).val());
        $(range_min).html(addSeparator(minVal));


        if (origin === 'max' && maxVal - 1 < minVal) {
            $(maxBtn).val(2 + minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        $(range_max).html(addSeparator(maxVal));
    }

    // size range
    function sizeRangeInputChangeEventHandler(e) {
        var rangeGroup = $(this).attr('name'),
            minBtn = $('.size_min'),
            maxBtn = $('.size_max'),
            range_min = $('.size_range_min'),
            range_max = $('.size_range_max'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;

        if (origin === 'size_min' && minVal > maxVal - 1) {
            $(minBtn).val(maxVal - 1);
        }
        var minVal = parseInt($(minBtn).val());
        $(range_min).html(addSeparator(minVal));


        if (origin === 'size_max' && maxVal - 1 < minVal) {
            $(maxBtn).val(1 + minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        $(range_max).html(addSeparator(maxVal));
    }

    $('input[name="range_1"]').on('input', rangeInputChangeEventHandler);
    $('input[name="size_range_1"]').on('input', sizeRangeInputChangeEventHandler);

})();
