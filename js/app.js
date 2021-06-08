"use strict";

const submitBtn = document.querySelector('#submitBtn');
const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const selectMenu = document.querySelector('#service');
const answerDiv = document.querySelector('#answer');
const clearBtn = document.querySelector('#clear');
let percentage = '';

// helper functions
function validateCost() {
    const costValue = bill.value;
    const validBill = /^\d+(\.?)\d{0,2}$/.test(costValue);
    return validBill;
}

function validatePeople() {
    const peopleNum = people.value;
    const validPeople = /^[1-9][0-9]?$|^100$/.test(peopleNum); // regex from https://stackoverflow.com/questions/13473523/regex-number-between-1-and-100
    return validPeople;
}

selectMenu.addEventListener('change', e => {
    for (let i = 0; i < selectMenu.options.length; i++) {
        percentage = e.target.value;
    }
});

submitBtn.addEventListener('click', () => {
    const invalidCost = document.querySelector('.invalid-cost');
    const invalidPercentage = document.querySelector('.invalid-percentage');
    const invalidPeople = document.querySelector('.invalid-people');
    if (!validateCost()) {
        invalidCost.style.display = 'block';
    } else {
        invalidCost.style.display = 'none';
    };
    if (percentage === ''){
        invalidPercentage.style.display = 'block';
    } else {
        invalidPercentage.style.display = 'none';
    };
    if (!validatePeople()){
        invalidPeople.style.display = 'block';
    } else {
        invalidPeople.style.display = 'none';
    };
    if (bill.value !== '' && percentage !== '' && people.value !== ''){
        const tip = ((bill.value * percentage) / people.value).toFixed(2);
        if (parseInt(people.value) === 1) {
            answerDiv.innerHTML = `<h2 class="tip">Your tip will be: $${tip}`;
        } else {
            answerDiv.innerHTML = `<h2 class="tip">Your tip will be: $${tip} each`;
        }
    }
});

clearBtn.addEventListener('click', () => {
    bill.value = '';
    selectMenu.selectedIndex = 0;
    people.value = '';
    percentage = '';
    answerDiv.innerHTML = '';
});