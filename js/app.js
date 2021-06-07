"use strict";

const submitBtn = document.querySelector('#submitBtn');
const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const selectMenu = document.querySelector('#service');
const answerDiv = document.querySelector('#answer');
const clearBtn = document.querySelector('#clear');

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

let percentage = '';

selectMenu.addEventListener('change', e => {
    for (let i = 0; i < selectMenu.options.length; i++) {
        percentage = e.target.value;
    }
});

submitBtn.addEventListener('click', () => {
    let billAmount = ''; 
    let billPercentage = '';
    let peopleNum = '';
    if (!validateCost()) {
        document.querySelector('.invalid-cost').style.display = 'block';
    } else {
        document.querySelector('.invalid-cost').style.display = 'none';
        billAmount = bill.value;
    };
    if (percentage === ''){
        document.querySelector('.invalid-percentage').style.display = 'block';
    } else {
        document.querySelector('.invalid-percentage').style.display = 'none';
        billPercentage = percentage;
    };
    if (!validatePeople()){
        document.querySelector('.invalid-people').style.display = 'block';
    } else {
        document.querySelector('.invalid-people').style.display = 'none';
        peopleNum = people.value;
    };
    if (billAmount !== '' && billPercentage !== '' && peopleNum !== ''){
        const tip = ((billAmount * billPercentage) / peopleNum).toFixed(2);
        if (parseInt(peopleNum) === 1) {
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