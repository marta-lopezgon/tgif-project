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

    if (window.location.pathname == "/tgif-project/Senate-Attendance-statistics.html") {
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

                leastEngaged();

                lessTen();

                mostEngaged();

                mostTen();

                tabAtGlance();

                lessEngag();

                mostEngag();
            },
            "error": function (data) {
                console.log(data);
            }
        });
    }
    if (window.location.pathname == "/tgif-project/House-Attendance-statistics.html") {
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

                leastEngaged();

                lessTen();

                mostEngaged();

                mostTen();

                tabAtGlance();

                lessEngag();

                mostEngag();
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

//LESS ENGAGED ATENDANCE" TABLE

function leastEngaged() {
    members.sort(function (a, b) {
        return b.missed_votes - a.missed_votes
    });
}

function lessTen() {

    for (var i = 0; i < 10; i++) {
        statistics.missedMostVote.push(members[i])
    }
}

//"MOST ENGAGED ATENDANCE" TABLE

function mostEngaged() {
    members.sort(function (a, b) {
        return a.missed_votes - b.missed_votes
    });
}

function mostTen() {
    for (var i = 0; i < 10; i++) {
        statistics.missedLeastVote.push(members[i])
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

function lessEngag() {
    var table = document.getElementById("tableLeastEngaged");
    document.getElementById("tableLeastEngaged").innerHTML = ""
    for (var i = 0; i < statistics.missedMostVote.length; i++) {

        var firstName = statistics.missedMostVote[i].first_name;
        var lastName = statistics.missedMostVote[i].last_name;
        var midName = statistics.missedMostVote[i].middle_name;
        if (midName == null) {
            midName = "";
        }

        var fullName = firstName + " " + midName + " " + lastName;
        var urlName = statistics.missedMostVote[i].url;

        var row = document.createElement("tr");
        var ancor = document.createElement("a");

        ancor.setAttribute("href", urlName);

        ancor.setAttribute("target", "_blank")

        ancor.innerHTML = fullName;

        var nameCell = document.createElement("td");
        var missedCell = document.createElement("td");
        var percentCell = document.createElement("td");

        nameCell.append(ancor);

        var missed = statistics.missedMostVote[i].missed_votes;
        missedCell.append(missed);

        var percent = statistics.missedMostVote[i].missed_votes_pct;
        percentCell.append(percent);

        row.append(nameCell);
        row.append(missedCell);
        row.append(percentCell);

        table.append(row);
    }
}

function mostEngag() {
    var table = document.getElementById("tableMostEngaged");
    document.getElementById("tableMostEngaged").innerHTML = ""
    for (var i = 0; i < statistics.missedLeastVote.length; i++) {

        var firstName = statistics.missedLeastVote[i].first_name;
        var lastName = statistics.missedLeastVote[i].last_name;
        var midName = statistics.missedLeastVote[i].middle_name;
        if (midName == null) {
            midName = "";
        }

        var fullName = firstName + " " + midName + " " + lastName;
        var urlName = statistics.missedLeastVote[i].url;

        var row = document.createElement("tr");
        var ancor = document.createElement("a");

        ancor.setAttribute("href", urlName);

        ancor.setAttribute("target", "_blank")

        ancor.innerHTML = fullName;

        var nameCell = document.createElement("td");
        var missedCell = document.createElement("td");
        var percentCell = document.createElement("td");

        nameCell.append(ancor);

        var missed = statistics.missedLeastVote[i].missed_votes;
        missedCell.append(missed);

        var percent = statistics.missedLeastVote[i].missed_votes_pct;
        percentCell.append(percent);

        row.append(nameCell);
        row.append(missedCell);
        row.append(percentCell);

        table.append(row);
    }
}
