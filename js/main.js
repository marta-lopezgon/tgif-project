var members = [];

//JSON CALL TO SERVER

$(document).ready(function () {

    var rep = document.getElementById("rep");

    var dem = document.getElementById("dem");

    var ind = document.getElementById("ind");

    var dropSelected = document.getElementById("stateChecked");

    if (window.location.pathname == "/tgif-project/senate-starter-page.html") {
        $.ajax({
            type: "get",
            url: "https://api.propublica.org/congress/v1/113/senate/members.json",
            headers: {
                "X-API-KEY": "QIYVwsWx5BmvrGYVHAyZH9gCeD1mTMspxGxvsssN"
            },
            "success": function (data) {
                console.log("senate data", data);
                members = data.results[0].members;
                showPage();

                dropdown(members);

                var filteredArray = filterByParty(members);

                addTable(filteredArray);

                rep.addEventListener("click", function () {
                    addTable(filterByParty(members));
                })

                dem.addEventListener("click", function () {
                    addTable(filterByParty(members));
                })

                ind.addEventListener("click", function () {
                    addTable(filterByParty(members));
                })

                dropSelected.addEventListener("change", function () {
                    addTable(filterByParty(members));
                    console.log("stateChecked");
                })

            },
            "error": function (data) {
                console.log(data);
            }
        });
    }
    if (window.location.pathname == "/tgif-project/house-starter-page.html") {
        $.ajax({
            type: "get",
            url: "https://api.propublica.org/congress/v1/113/house/members.json",
            headers: {
                "X-API-KEY": "QIYVwsWx5BmvrGYVHAyZH9gCeD1mTMspxGxvsssN"
            },
            "success": function (data) {
                console.log("house data", data);
                members = data.results[0].members;
                showPage();

                dropdown(members);

                var filteredArray = filterByParty(members);

                addTable(filteredArray);

                rep.addEventListener("click", function () {
                    addTable(filterByParty(members));
                })

                dem.addEventListener("click", function () {
                    addTable(filterByParty(members));
                })

                ind.addEventListener("click", function () {
                    addTable(filterByParty(members));
                })

                dropSelected.addEventListener("change", function () {
                    addTable(filterByParty(members));
                    console.log("stateChecked");
                })

            },
            "error": function (data) {
                console.log(data);
            }
        });
    }

});

//LOADER

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

//DROPDOWN FILTER

function dropdown(members) {
    var stateChecked = document.getElementById("stateChecked");
    var allStates = [];
    for (var i = 0; i < members.length; i++) {
        var state = members[i].state;
        if (allStates.includes(state) == false) {
            allStates.push(members[i].state)
        }
    }

    allStates.sort();

    var stateAll = document.createElement("option");
    stateAll.setAttribute("value", " ");
    stateAll.innerHTML = " ";
    document.getElementById("stateChecked").append(stateAll);

    for (var j = 0; j < allStates.length; j++) {
        var inside = document.createElement("option");

        inside.setAttribute("value", allStates[j]);

        inside.append(allStates[j]);

        document.getElementById("stateChecked").append(inside);
    }
}

//CHECKBOX FILTER

function filterByParty(members) {
    var newMemberArray = [];
    var dropSelected = document.getElementById("stateChecked");
    var noPartySelected = rep.checked == false && dem.checked == false && ind.checked == false;

    for (var i = 0; i < members.length; i++) {
        var partyPassed;

        if (rep.checked && members[i].party == "R" || dem.checked && members[i].party == "D" || ind.checked && members[i].party == "I" || noPartySelected) {
            partyPassed = true;

        } else {
            partyPassed = false;
        }

        var statePassed;

        if (dropSelected.value == members[i].state || dropSelected.value == " ") {
            statePassed = true;

        } else {
            partyPassed = false;
        }

        if (partyPassed == true && statePassed == true) {
            newMemberArray.push(members[i]);
        }

    }
    return newMemberArray;
}

//MEMBERS TABLE

function addTable(members) {
    var table = document.getElementById("table");
    document.getElementById("table").innerHTML = ""
    for (var i = 0; i < members.length; i++) {

        var firstName = members[i].first_name;
        var lastName = members[i].last_name;
        var midName = members[i].middle_name;
        if (midName == null) {
            midName = "";
        }

        var fullName = firstName + " " + midName + " " + lastName;
        var urlName = members[i].url;

        var row = document.createElement("tr");
        var ancor = document.createElement("a");

        ancor.setAttribute("href", urlName);

        ancor.setAttribute("target", "_blank")

        ancor.innerHTML = fullName;


        var nameCell = document.createElement("td");
        var partyCell = document.createElement("td");
        var stateCell = document.createElement("td");
        var seniorCell = document.createElement("td");
        var votesCell = document.createElement("td");


        nameCell.append(ancor);

        var party = members[i].party;
        partyCell.append(party);

        var state = members[i].state;
        stateCell.append(state);

        var seniority = members[i].seniority;
        seniorCell.append(seniority);

        var votes = members[i].votes_with_party_pct;
        votesCell.append(votes);


        row.append(nameCell);
        row.append(partyCell);
        row.append(stateCell);
        row.append(seniorCell);
        row.append(votesCell);

        table.append(row);
    }
}

// READ MORE / READ LESS

$(document).ready(function () {
    $(".service-info").hide();
    $(".read-less").hide();
    $(".read-more").click(function () {
        $(this).hide();
        $(this).next().show();
        $(this).next().next().show();
    })
    $(".read-less").click(function () {
        $(this).prev().hide();
        $(this).prev().prev().show();
        $(this).hide();
    })
})
