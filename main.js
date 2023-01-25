let inputs = document.querySelectorAll("input");
let billsInp = document.querySelector(".bills-inp");
let customTipInp = document.querySelector("main .col-1 .tips .tip-container input.tip");
let pplNumInp = document.querySelector(".ppl-num-inp");
let tips = document.querySelectorAll(".tip-container > div.tip");
let totalspan = document.querySelector(".col-2 .row-2 h2 span");
let tipspan = document.querySelector(".col-2 .row-1 h2 span");
let zeroSpan = document.querySelector(".zero-spn");
let resetBtn = document.querySelector("button");

inputs.forEach((input) => {
    input.addEventListener("input", () => {
        // force input to only allow numbers
        input.value = input.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");

        if (pplNumInp.value >= 1 && pplNumInp.value <= 1000) {
            // Change Total Span Value
            totalspan.innerHTML = (+billsInp.value / pplNumInp.value).toFixed(2);
        }
        // if user click tip first
        tips.forEach((tip) => {
            if (tip.classList[tip.classList.length - 1] === "active") {
                let tipValue = tip.innerHTML.replace("%", "");
                tipspan.innerHTML = ((+tipValue * +totalspan.innerHTML) / 100).toFixed(2);
                totalspan.innerHTML = (+totalspan.innerHTML + +tipspan.innerHTML).toFixed(2);
            }
        });
        changeTipAmoutValueCustom();
    });
    changeTipAmoutValue();
});

function changeTipAmoutValue() {
    tips.forEach((tip) => {
        tip.onclick = function () {
            // reset
            totalspan.innerHTML -= tipspan.innerHTML;
            totalspan.innerHTML = (+totalspan.innerHTML).toFixed(2);
            customTipInp.value = "";
            // calculate Percentages when click in tip
            let tipValue = tip.innerHTML.replace("%", "");
            tipspan.innerHTML = ((+tipValue * +totalspan.innerHTML) / 100).toFixed(2);
            totalspan.innerHTML = (+totalspan.innerHTML + +tipspan.innerHTML).toFixed(2);
            // active class
            tips.forEach((tip) => {
                tip.classList.remove("active");
            });
            tip.classList.toggle("active");
        };
    });
}

function changeTipAmoutValueCustom() {
    // check if user already entered customTipInpt
    if (customTipInp.value.length >= 1) {
        tipspan.innerHTML = ((customTipInp.value * +totalspan.innerHTML) / 100).toFixed(2);
        totalspan.innerHTML = (+totalspan.innerHTML + +tipspan.innerHTML).toFixed(2);
    }
    // when focus in customTipInp remove active class from tips
    customTipInp.onfocus = function () {
        tips.forEach((tip) => {
            tip.classList.remove("active");
        });
    };
}

// show "can't be zero" message
pplNumInp.addEventListener("input", () => {
        // if the value is not string
        if(pplNumInp.value !== "") {
            if (pplNumInp.value.length <= 0 || pplNumInp.value == 0) {
                zeroSpan.style.display = "block";
                pplNumInp.style = "border-color: red; border-color: red;";
                setTimeout(() => {
                    pplNumInp.style = "border-color: red; transform: translateX(2.5px)";
                }, 100);
            } else {
                pplNumInp.style = "border-color: var(--Strong-cyan); transform: none";
                zeroSpan.style.display = "none";
            }
        }
});

// Reset Button
inputs.forEach((input) => {
    input.onblur = function () {
        // add valid class to reset button
        if (input.value.length >= 1) {
            resetBtn.classList.add("valid");
        } else {
            resetBtn.classList.remove("valid");
        }
    };
});

resetBtn.addEventListener("click", () => {
    totalspan.innerHTML = "0.00";
    tipspan.innerHTML = "0.00";
    tips.forEach((tip) => {
        tip.classList.remove("active");
    });
    inputs.forEach((input) => {
        input.value = "";
    });
    resetBtn.classList.toggle("valid");
});