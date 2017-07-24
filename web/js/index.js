/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    //Generate random number, to set page background using addClass
    var randomNumber = randomIntFromInterval(1, 5);
    var page = $(".login-page-content");
    if (randomNumber === 1) {
        page.addClass("bg1");
    } else if (randomNumber === 2) {
        page.addClass("bg2");
    } else if (randomNumber === 3) {
        page.addClass("bg3");
    } else if (randomNumber === 4) {
        page.addClass("bg4");
    } else if (randomNumber === 5) {
        page.addClass("bg5");
    }

    //Username/Password Declaration
    var unArray = ["rashmi.hr@owenanalytics.com", "tej.ceo@owenanalytics.com", "hitendra.business@owenanalytics.com", "hemant.business@owenanalytics.com", "aditya.business@owenanalytics.com", "demo@owenanalytics.com"];
    var pwArray = ["abc123","abc123","abc123","abc123","8PdGr-5CF$33^=Rr", "?!Y*q8grKQcg*j6!"];

    $("#loginButton").on("click", function () {

        var username = $("#username").val();
        var password = $("#password").val();

        //Valid/invalid login flag
        var valid = false;

        //Iterate through arrays, and check that username and passwords match
        for (var i = 0; i < unArray.length; i++) {
            if ((username === unArray[i]) && (password === pwArray[i])) {
                valid = true;
                break;
            }
        }

        //Check if entered username/password
        if ((username.length === 0) || (password.length === 0)) {
            if ((username.length === 0) && (password.length === 0)) {
                snackbarMsg(3);
            } else if (password.length === 0) {
                snackbarMsg(2);
            } else if (username.length === 0) {
                snackbarMsg(1);
            }
        }
        //Check if valid flag set as true, means username and password matched
        else if (valid) {
            snackbarMsg(4);
            setTimeout(function () {
                window.location = "hiring.html";
            }, 1500);
        }
        //Invalid login details entered
        else {
            snackbarMsg(5);
        }
    });
});

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function snackbarMsg(flag) {
    var snackbarContainer = document.querySelector('#snackbar');
    if (flag === 1) {
        var data = {message: 'Please enter a username'};
    } else if (flag === 2) {
        var data = {message: 'Please enter a password'};
    } else if (flag === 3) {
        var data = {message: 'Please enter a username and password'};
    } else if (flag === 4) {
        var data = {message: 'Login successful'};
    } else if (flag === 5) {
        var data = {message: 'Invalid login credentials. Please try again.'};
    }
    'use strict';
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}