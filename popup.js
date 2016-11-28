/**
 * Main function to replace the links on the webpage to redirect to ratemyprof instead.
 */

$(function () {
    var arr = [], l = document.links;
    console.log(l);
    setTimeout(function () {
        for (var i = 0; i < l.length; i++) {
            if (l[i].href.includes('#') && !l[i].innerText.includes('Did')) {
                l[i].setAttribute('href', "http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+waterloo&queryoption=HEADER&query=" + l[i].innerText + "&facetSearch=true");
                l[i].setAttribute('target', '_blank');
                l[i].innerHTML = l[i].innerText + " (RMP)";
                //console.log(l[i]);
                arr.push(l[i].innerText);
            }
        }
        //console.log(arr);
        //getProfURL(arr[1]);
    }, 1000);


    function getProfURL(name) {
        name = name.toLowerCase();
        name = name.replace(/ /g, "+");
        var url = "http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+waterloo&queryoption=HEADER&query=" + name + "&facetSearch=true";
        getProfID(url, name);
        //console.log("This is search: " + url);
    }

    function getProfID(profURL, name) {

        var xmlRequestInfo = {
            method: 'GET',
            action: 'xhttp',
            url: profURL,
            professorName: name
        };
    }


});
