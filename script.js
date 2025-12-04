var count = 0;
var clik_id;
var clik_id2;
var globalVariable;

function passID(clicked_id) {
    count++;
    if (count % 2 != 0) {
        clik_id = clicked_id;
        document.getElementById(clik_id).style.backgroundColor = "red";
        var a = document.getElementById(clik_id).innerText;
        // if (a != "") {
        globalVariable = a;
        // }
    }
    else {
        clik_id2 = clicked_id;
        storePrePawnPlaces();

        var checkFirstClick = document.getElementById(clik_id).innerText;
        var checkSecondClick = document.getElementById(clik_id2).innerText;
        if (checkFirstClick == "" && checkSecondClick == "") {
            document.getElementById(clik_id2).innerText = "";
        }
        var b = document.getElementById(clik_id2).innerText;
        if (b != globalVariable) {       //con to remove only other values (not remove itself when double clicked)
            document.getElementById(clik_id).innerText = "";
        }
        if (globalVariable != "") {     //(it was erasing 2nd box if 1st box was empty )
            document.getElementById(clik_id2).innerText = globalVariable;
        }
        document.getElementById(clik_id).style.backgroundColor = "";
    }
}

var storeInArray = 1; //By default 1st move values will be stored in 1st array 
var arr = [];
var arr1 = [];
var arr2 = [];
var setState;

function storePrePawnPlaces() {

    var firstClickVal = document.getElementById(clik_id).innerText;
    var secondClickVal = document.getElementById(clik_id2).innerText;

    if ((firstClickVal != "") && (firstClickVal != secondClickVal)) {
        //arrar of paws wont be stored inside undo array memory if its values are null and if double clicked on same pawn the values wont store in arr

        for (let i = 1; i <= 64; i++) {
            var a = document.getElementById(i).innerHTML;

            if (storeInArray == 1) {

                // if (arr.length >= 64) { //max 64 values can be fit so if it exceedss it will erase the the array and store new values from the begining
                //     arr.length = 0;
                // }
                //     arr.push(a);
                arr[i - 1] = a;           //this line will just replace the value with index (simple, better than erasing the array and storing)

                setState = 1;

            }
            else if (storeInArray == 2) {

                arr1[i - 1] = a;
                setState = 2;
            }
            else if (storeInArray == 3) {

                arr2[i - 1] = a;

                setState = 3;
            }
        }
        storeInArray++;
    }
    if (storeInArray >= 4) {
        storeInArray = 1;

    }
}

var retriveFromArr = 1;
var undoCount = 0;
function undoFun() {
    undoCount++;
    if (undoCount <= 3) {

        for (let i = 1; i <= 64; i++) {
            if (setState == 1 && arr.length != 0) {
                document.getElementById(i).innerText = arr[i - 1];
            }
            else if (setState == 2 && arr1.length != 0) {
                document.getElementById(i).innerText = arr1[i - 1];
            }
            else if (setState == 3 && arr2.length != 0) {
                document.getElementById(i).innerText = arr2[i - 1];
            }
        }
        if (setState == 1) {
            setState = 3;
        } else {
            setState--;
        }
        retriveFromArr++;
        if (retriveFromArr >= 4) {
            retriveFromArr = 1;
        }
    }
    else {
        undoCount = 0;
        for (let i = 1; i <= 64; i++) {
            if (setState == 1 && arr1.length != 0) {
                document.getElementById(i).innerText = arr1[i - 1];
                arr[i - 1] = arr1[i - 1];
                arr2[i - 1] = arr1[i - 1];
            }
            else if (setState == 2 && arr2.length != 0) {
                document.getElementById(i).innerText = arr2[i - 1];
                arr[i - 1] = arr2[i - 1];
                arr1[i - 1] = arr2[i - 1];
            }
            else if (setState == 3 && arr.length != 0) {
                document.getElementById(i).innerText = arr[i - 1];
                arr1[i - 1] = arr[i - 1];
                arr2[i - 1] = arr[i - 1];

            }
        }
    }
}
