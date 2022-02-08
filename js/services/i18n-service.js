var gTrans = {
    id: {
        en: 'Id',
        he: 'מספר מזהה'
    },
    title: {
        en: 'Title',
        he: 'שם הספר'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    'create-book-h1': {
        en: 'Book Shop',
        he: 'חנות הספרים'
    },
    'create-book': {
        en: 'Add a Book',
        he: 'הוסף ספר'
    },
    'on-read': {
        en: 'Read',
        he: 'קרא'
    },
    'on-update': {
        en: 'Update',
        he: 'עדכן'
    },
    'on-delete': {
        en: 'Delete',
        he: 'מחק'
    },


}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}