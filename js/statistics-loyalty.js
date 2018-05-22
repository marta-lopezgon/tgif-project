var members = [];

var statistics = {

    "numberOfDemocrats": 0,
    "numberOfRepublicans": 0,
    "numberOfIndependents": 0,
    "republicanPartyPercentage": 0,
    "democratsPartyPercentage": 0,
    "independentPartyPercentage": 0,
    "doNotVote": [],
    "doVote": [],
    "missedMostVote": [],
    "missedLeastVote": []
}

//JSON CALL TO SERVER

$(document).ready(function () {

    if (window.location.pathname == "/Senate-Party-Loyalty-statistics.html") {
        $.ajax({
            type: "get",
            url: "https://api.propublica.org/congress/v1/113/senate/members.json",
            headers: {
                "X-API-KEY": "QIYVwsWx5BmvrGYVHAyZH9gCeD1mTMspxGxvsssN"
            },
            "success": function (data) {
                console.log("senate ver data", data);
                members = data.results[0].members;
                showPage();

                glanceStats();

                leastLoyal();

                lessTenLoyal();

                mostLoyal();

                mostTenLoyal();

                tabAtGlance();

                leastLoy();

                mostLoy();
            },
            "error": function (data) {
                console.log(data);
            }
        });
    }
    if (window.location.pathname == "/House-Party-Loyalty-statistics.html") {
        $.ajax({
            type: "get",
            url: "https://api.propublica.org/congress/v1/113/house/members.json",
            headers: {
                "X-API-KEY": "QIYVwsWx5BmvrGYVHAyZH9gCeD1mTMspxGxvsssN"
            },
            "success": function (data) {
                console.log("house ver data", data);
                members = data.results[0].members;
                showPage();

                glanceStats();

                leastLoyal();

                lessTenLoyal();

                mostLoyal();

                mostTenLoyal();

                tabAtGlance();

                leastLoy();

                mostLoy();
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

//"AT GLANCE" TABLE (ATENDANCE + LOYALTY)

function glanceStats() {
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == "R") {
            //statistics.numberOfRepublicans = statistics.numberOfRepublicans + 1; (lo que quiero que haga)
            //statistics.numberOfRepublicans += 1; (un atajo del de arriba)
            statistics.numberOfRepublicans++;
            statistics.republicanPartyPercentage += members[i].votes_with_party_pct;
        }
        if (members[i].party == "D") {
            statistics.numberOfDemocrats++;
            statistics.democratsPartyPercentage += members[i].votes_with_party_pct;
        }
        if (members[i].party == "I") {
            statistics.numberOfIndependents++;
            statistics.independentPartyPercentage += members[i].votes_with_party_pct;
        }
        if (statistics.numberOfIndependents != 0) {
            statistics.independentPartyPercentage = statistics.independentPartyPercentage / statistics.numberOfIndependents;

        } else {
            statistics.independentPartyPercentage = 0;
        }
    }
    statistics.republicanPartyPercentage = statistics.republicanPartyPercentage / statistics.numberOfRepublicans;
    statistics.democratsPartyPercentage = statistics.democratsPartyPercentage / statistics.numberOfDemocrats;
}

//"LEAST LOYAL PARTY" TABLE

function leastLoyal() {
    members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    });
}

function lessTenLoyal() {
    for (var i = 0; i < 10; i++) {
        statistics.doNotVote.push(members[i])
    }
}

//"MOST LOYAL PARTY" TABLE

function mostLoyal() {
    members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct
    });
}

function mostTenLoyal() {
    for (var i = 0; i < 10; i++) {
        statistics.doVote.push(members[i])
    }
}

//PUT INFO IN TABLES

function tabAtGlance() {
    var table = document.getElementById("tableAtGlance");
    document.getElementById("tableAtGlance").innerHTML = ""
    for (var i = 0; i < 1; i++) {
        var row = document.createElement("tr");

        //FIRST TR
        var partyCell = document.createElement("td");
        var numRepre = document.createElement("td");
        var votedCell = document.createElement("td");

        var party = "Democrats";
        partyCell.append(party);

        var repre = statistics.numberOfDemocrats;
        numRepre.append(repre);

        var voted = statistics.democratsPartyPercentage.toFixed(2);
        votedCell.append(voted);

        row.append(partyCell);
        row.append(numRepre);
        row.append(votedCell);

        table.append(row);

        //SECOND TR
        var row = document.createElement("tr");

        var partyCell = document.createElement("td");
        var numRepre = document.createElement("td");
        var votedCell = document.createElement("td");

        var party = "Republicans";
        partyCell.append(party);

        var repre = statistics.numberOfRepublicans;
        numRepre.append(repre);

        var voted = statistics.republicanPartyPercentage.toFixed(2);
        votedCell.append(voted);

        row.append(partyCell);
        row.append(numRepre);
        row.append(votedCell);

        table.append(row);

        //THIRD TR
        var row = document.createElement("tr");

        var partyCell = document.createElement("td");
        var numRepre = document.createElement("td");
        var votedCell = document.createElement("td");

        var party = "Independents";
        partyCell.append(party);

        var repre = statistics.numberOfIndependents;
        numRepre.append(repre);

        var voted = statistics.independentPartyPercentage.toFixed(2);
        votedCell.append(voted);

        row.append(partyCell);
        row.append(numRepre);
        row.append(votedCell);

        table.append(row);

        //FOURTH TR
        var row = document.createElement("tr");

        var partyCell = document.createElement("td");
        var numRepre = document.createElement("td");
        var votedCell = document.createElement("td");

        var party = "Total";
        partyCell.append(party);

        var repre = statistics.numberOfIndependents + statistics.numberOfRepublicans + statistics.numberOfDemocrats;
        numRepre.append(repre);

        var voted = (statistics.independentPartyPercentage + statistics.republicanPartyPercentage + statistics.democratsPartyPercentage) / 3;
        votedCell.append(voted.toFixed(2));

        row.append(partyCell);
        row.append(numRepre);
        row.append(votedCell);

        table.append(row);
    }
}

function leastLoy() {
    var table = document.getElementById("tableLeastLoyal");
    document.getElementById("tableLeastLoyal").innerHTML = ""
    for (var i = 0; i < statistics.doNotVote.length; i++) {

        var firstName = statistics.doNotVote[i].first_name;
        var lastName = statistics.doNotVote[i].last_name;
        var midName = statistics.doNotVote[i].middle_name;
        if (midName == null) {
            midName = "";
        }

        var fullName = firstName + " " + midName + " " + lastName;
        var urlName = statistics.doNotVote[i].url;

        var row = document.createElement("tr");
        var ancor = document.createElement("a");

        ancor.setAttribute("href", urlName);

        ancor.setAttribute("target", "_blank")

        ancor.innerHTML = fullName;

        var nameCell = document.createElement("td");
        var votesCell = document.createElement("td");
        var percentCell = document.createElement("td");

        nameCell.append(ancor);

        var votes = statistics.doNotVote[i].total_votes;
        votesCell.append(votes);

        var percent = statistics.doNotVote[i].missed_votes_pct;
        percentCell.append(percent);

        row.append(nameCell);
        row.append(votesCell);
        row.append(percentCell);

        table.append(row);
    }
}

function mostLoy() {
    var table = document.getElementById("tableMostLoyal");
    document.getElementById("tableMostLoyal").innerHTML = ""
    for (var i = 0; i < statistics.doVote.length; i++) {

        var firstName = statistics.doVote[i].first_name;
        var lastName = statistics.doVote[i].last_name;
        var midName = statistics.doVote[i].middle_name;
        if (midName == null) {
            midName = "";
        }

        var fullName = firstName + " " + midName + " " + lastName;
        var urlName = statistics.doVote[i].url;

        var row = document.createElement("tr");
        var ancor = document.createElement("a");

        ancor.setAttribute("href", urlName);

        ancor.setAttribute("target", "_blank")

        ancor.innerHTML = fullName;

        var nameCell = document.createElement("td");
        var votesCell = document.createElement("td");
        var percentCell = document.createElement("td");

        nameCell.append(ancor);

        var votes = statistics.doVote[i].total_votes;
        votesCell.append(votes);

        var percent = statistics.doVote[i].missed_votes_pct;
        percentCell.append(percent);

        row.append(nameCell);
        row.append(votesCell);
        row.append(percentCell);

        table.append(row);
    }
}
