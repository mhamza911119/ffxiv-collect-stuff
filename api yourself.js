$(document).ready(function() {

    //define variables

    //declare function to get user information, accessing endpoint
    const getUser = (userID, userNum) => {
        $.ajax({
            type: "GET",
            url: "https://ffxivcollect.com/api/characters/" + userID,
            dataType: "json",
            success: function(result, status, xhr) {
                console.log(result);
                let currentUser = result;
                parseUser(currentUser, userNum);
            },
            error: function(xhr, status, error) {
                alert(
                    "Result: " +
                    status +
                    " " +
                    error +
                    " " +
                    xhr.status +
                    " " +
                    xhr.statusText
                );
            },
        });
    };

    const parseUser = (user, userNum) => {
        let currentUser = user;
        $('.infoList').remove();
        $(`#characterPanel${userNum}`).append(`<ul class="infoList" id="infoList${userNum}"> </ul>`);
        $(`#infoList${userNum}`).prepend(`<h>${currentUser.name}</h><br><img src="${currentUser.portrait}">`);
        $(`#infoList${userNum}`).append(`<li>Server: ${currentUser.server}</li><li>Achievements: ${currentUser.achievements.count}/${currentUser.achievements.total}</li><li>Mounts: 
        ${currentUser.mounts.count}/${currentUser.mounts.total}</li><li>Minions: ${currentUser.minions.count}/${currentUser.minions.total}</li> <label for="ownAchievement${userNum}">Enter an integer from 0-100:</label>
        <input id="ownAchievement${userNum}" name="ownAchievement${userNum}" type="text" /> <button type="button" id="button${userNum + 3}">Submit</button>`);
        $(`img`).css(`height`, `500px`);
        $('ul').css('list-style-type', 'none');
        console.log(`Users name is ${currentUser.name}, server ${currentUser.server}, mounts count ${currentUser.mounts.count}, achievements count ${currentUser.achievements.count} `);
    }

    const comparison = (firstUserID, secondUserID) => {
        $.ajax({
            type: "GET",
            url: "https://ffxivcollect.com/api/characters/" + firstUserID,
            dataType: "json",
            success: function(result, status, xhr) {
                console.log(result);
                let firstUser = result;
                $.ajax({
                    type: "GET",
                    url: "https://ffxivcollect.com/api/characters/" + secondUserID,
                    dataType: "json",
                    success: function(result, status, xhr) {
                        console.log(result);
                        let secondUser = result;
                        console.log(firstUser,secondUser);
                        $('.infoList').remove();
                        $(`#characterPanel1`).append(`<ul class="infoList" id="infoList1"> </ul>`);
                        $(`#infoList1`).prepend(`<h>${firstUser.name}</h><br><img src="${firstUser.portrait}">`);
                        $(`#infoList1`).append(`<li>Server: ${firstUser.server}</li><li>Achievements: ${firstUser.achievements.count}/${firstUser.achievements.total}</li><li>Mounts: ${firstUser.mounts.count}/${firstUser.mounts.total}</li><li>Minions: ${firstUser.minions.count}/${firstUser.minions.total}</li>`);
                        console.log(`Users name is ${firstUser.name}, server ${firstUser.server}, mounts count ${firstUser.mounts.count}, achievements count ${firstUser.achievements.count} `);
                        $(`#characterPanel2`).append(`<ul class="infoList" id="infoList2"> </ul>`);
                        $(`#infoList2`).prepend(`<h>${secondUser.name}</h><br><img src="${secondUser.portrait}">`);
                        $(`#infoList2`).append(`<li>Server: ${secondUser.server}</li><li>Achievements: ${secondUser.achievements.count}/${secondUser.achievements.total}</li><li>Mounts: ${secondUser.mounts.count}/${secondUser.mounts.total}</li><li>Minions: ${secondUser.minions.count}/${secondUser.minions.total}</li>`);
                        $(`img`).css(`height`, `500px`);
                        $('ul').css('list-style-type', 'none');
                        console.log(`Users name is ${secondUser.name}, server ${secondUser.server}, mounts count ${secondUser.mounts.count}, achievements count ${secondUser.achievements.count} `);
                    },
                    error: function(xhr, status, error) {
                        alert(
                            "Result: " +
                            status +
                            " " +
                            error +
                            " " +
                            xhr.status +
                            " " +
                            xhr.statusText
                        );
                    },
                });
            },
            error: function(xhr, status, error) {
                alert(
                    "Result: " +
                    status +
                    " " +
                    error +
                    " " +
                    xhr.status +
                    " " +
                    xhr.statusText
                );
            },
        });
    }


    const getAchievements = (userID, userNum, ownAchievement) => {
        $.ajax({
            type: "GET",
            url: "https://ffxivcollect.com/api/characters/" + userID + "/achievements/owned",
            dataType: "json",
            success: function(result, status, xhr) {
                console.log(result);
                let currentUserAchievements = result;
                parseAchievements(currentUserAchievements, userNum, ownAchievement);
            },
            error: function(xhr, status, error) {
                alert(
                    "Result: " +
                    status +
                    " " +
                    error +
                    " " +
                    xhr.status +
                    " " +
                    xhr.statusText
                );
            },
        });
    };

    const parseAchievements = (currentUserAchievements, userNum, ownAchievement) => {
        $(`#achievementMessage`).remove();
        let counter = 0;
        $.each(currentUserAchievements, function(i, achievement) {
            if (parseFloat(achievement.owned) <= ownAchievement) {
                counter++;
            }
        });
        $(`#button${userNum + 3}`).after(`<div id="achievementMessage">This character has ${counter} achievements with an ownership rate of ${ownAchievement}% or lower.</div>`);
    };
    


    const getInputValue = (userNum) => {
        return parseInt($(`#ownAchievement${userNum}`).val());
    };
    
    

    $(document).on("click", "#button1", function() {
        getUser("35748373", 1);
    });

    $(document).on("click", "#button2", function() {
        getUser("35796195", 2);
    });

    $(document).on("click", "#button3", function() {
        comparison("35748373","35796195");
    });

    $(document).on("click", "#button4", function() {
        const ownAchievement1 = getInputValue(1)
        getAchievements("35748373", 1, ownAchievement1);
    });

    $(document).on("click", "#button5", function() {
        const ownAchievement2 = getInputValue(2);
        getAchievements("35796195", 2, ownAchievement2);
    });
});
