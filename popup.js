// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });

    // Most methods of the Chrome extension APIs are asynchronous. This means that
    // you CANNOT do something like this:
    //
    // var url;
    // chrome.tabs.query(queryInfo, function(tabs) {
    //   url = tabs[0].url;
    // });
    // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

$(function () {
    var replace = $("body").html().replace(/DWE/g, 'Far Out');
    $("body").html(replace);
    var arr = [], l = document.links;
    console.log(l);
    setTimeout(function () {
        for (var i = 0; i < l.length; i++) {

            if (l[i].href.includes('#') && !l[i].innerText.includes('Did')) {
                console.log(l[i]);
                arr.push(l[i].innerText);
            }

        }
        console.log(arr);
        getProfURL(arr[1]);
    }, 1000);


    function getProfURL(name) {
        name = name.toLowerCase();
        name = name.replace(/ /g, "+");
        var url = "http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+waterloo&queryoption=HEADER&query=" + name + "&facetSearch=true";
        getProfID(url, name);
        console.log("This is search: " + url);
    }

    function getProfID(profURL, name) {

        var xmlRequestInfo = {
            method: 'GET',
            action: 'xhttp',
            url: profURL,
            professorName: name
        };

        console.log(xmlRequestInfo);


        //setTimeout(function(){
        //    chrome.runtime.sendMessage(xmlRequestInfo, function (data) {
        //        var responseXML, professorName, ratings;
        //
        //        responseXML = data.responseXML;
        //        professorName = data.professorName;
        //
        //        //Find the numerical extension that leads to the specific professor's RMP page.
        //        var professorURLExtension = $(responseXML).find('.listing:first').find('a:first').attr('href');
        //        console.log(professorURLExtension);
        //
        //    });
        //}, 1000);

    }


    //alert("I'm working");

});
