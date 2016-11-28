/**
 * Main function to replace the links on the webpage to redirect to ratemyprof instead.
 */

$(function () {
    var arr = [], l = document.links, locations = {};
    console.log(l);

    setTimeout(function () {

        $("tbody tr").each(function() {
            var x = strip($(this).find("td:nth-child(6)").html()).replace(/\s+/g, '');
            locations[x] = "https://uwaterloo.ca/map/"+ lettersString(x) + "-" + firstNumber(x) +"?basemap=D&room=" + lettersString(x) + "+" + numbersString(x);

            //console.log(strip($(this).find("td:nth-child(6)").html()).replace(/\s+/g, ''));
            //console.log("https://uwaterloo.ca/map/"+ lettersString(x) + "-" + firstNumber(x) +"?basemap=D&room=" + lettersString(x) + "+" + numbersString(x));

            // Within tr we find the last td child element and get content

        });

        $.each(locations, function(index,value){
            console.log(index);
            console.log(value);


            $("tbody tr td:nth-child(6)").each(function() {
               // console.log(index);
                //console.log(strip($(this).find("p")[0].innerHTML).replace(/\s+/g, ''));
                 //console.log(strip($(this).find("p")[0]).replace(/\s+/g, '') == index);

                if(strip($(this).find("p")[0].innerHTML).replace(/\s+/g, '') === index && strip($(this).find("p")[0].innerHTML).replace(/\s+/g, '') != null){
                    var x = $(this).find("p").attr("class", index);

                    for(var i = 0; i < document.getElementsByClassName(index).length; i++){
                        document.getElementsByClassName(index)[i].innerHTML = "<a href=" + value + ">" + index  + "</a>";
                    }
                }

            });



            //console.log("https://uwaterloo.ca/map/"+ lettersString(value) + "-" + firstNumber(value) +"?basemap=D&room=" + lettersString(value) + "+" + numbersString(value));
        });

        for (var i = 0; i < l.length; i++) {
            if (l[i].href.includes('#') && !l[i].innerText.includes('Did')) {
                l[i].setAttribute('href', "http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+waterloo&queryoption=HEADER&query=" + l[i].innerText + "&facetSearch=true");
                l[i].setAttribute('target', '_blank');
                l[i].innerHTML = l[i].innerText + " (RMP)";
                //console.log(l[i]);
                arr.push(l[i].innerText);
            }
        }

     //   https://uwaterloo.ca/map/MC-1?basemap=D&room=MC+1020
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

    function lettersString(str){
        return str.replace(/[0-9]+/g, "");
    }

    function numbersString(str){
        return str.replace(/[a-zA-Z]+/g, "");
    }

    function firstNumber(str){
       return str.match(/\d/);
    }

    function strip(html)
    {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }


});
