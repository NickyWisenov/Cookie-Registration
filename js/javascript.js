function pollsubmit() {

        if (document.getElementById("intel").checked == true) {
            if ($.cookie("intelvotes") == null) {
                $.cookie("intelvotes", 1, { expires: 365 * 10 });
            } else {
                var currentVotes = parseInt($.cookie("intelvotes"), { expires: 365 * 10 });
                console.log(currentVotes);
                $.cookie("intelvotes", currentVotes + 1);
            }
            window.alert("Thank you for Voting for Intel Processor Lineup");
        }
        else if (document.getElementById("amd").checked == true) {
            if ($.cookie("amdvotes") == null) {
                $.cookie("amdvotes", 1, { expires: 365 * 10 });
            } else {
                var currentVotes = parseInt($.cookie("amdvotes"), { expires: 365 * 10 });
                console.log(currentVotes);
                $.cookie("amdvotes", currentVotes + 1);
            }
            window.alert("Thank you for Voting for AMD Processor Lineup");
        }
        else if (document.getElementById("samsung").checked == true) {
            if ($.cookie("samsungvotes") == null) {
                $.cookie("samsungvotes", 1, { expires: 365 * 10 });
            } else {
                var currentVotes = parseInt($.cookie("samsungvotes"), { expires: 365 * 10 });
                console.log(currentVotes);
                $.cookie("samsungvotes", currentVotes + 1);
            }
            window.alert("Thank you for Voting for Samsung Exynos Processor Lineup")
        }
        else {
            window.alert("You have not selected anything, please select your favorite processor in 2018");
        }
    }

function dinnervalidation1() {
    if (document.getElementById("no").checked == true){
        document.getElementById("dinnerdaytwo").style.display = 'block';
    }
}

function dinnervalidation2(){
    if(document.getElementById("yes").checked == true)
        document.getElementById("dinnerdaytwo").style.display = 'none';
}


function validate() {

    if(document.getElementById("workshopB").checked == true){
        if (document.getElementById("workshopD").checked == true || document.getElementById("workshopE").checked == true || document.getElementById("workshopF").checked == true)
                alert("The workshop Web Programming is an all day event. Selecting this workshop requires your attendance all day so Session 2 will be be available to register for");

        if (document.getElementById("workshopF").checked == true)
            if (document.getElementById("workshopG").checked == true || document.getElementById("workshopI").checked == true)
                    alert("Choosing Introduction to Cyber-Security requires you to also take Cyber-Forensics/Hacking for Session 3");


        if (document.getElementById("workshopH").checked == true)
            if(document.getElementById("workshopF").checked == false)
                    alert("If you choose Cyber-Forensics/Hacking You must also choose Introduction to Cyber-Security for Session 2");

                    return false;
            }
    else{
        return window.open("thankyou.html");
    }
}


$(document).ready(function () {
    if ($.cookie("intelvotes") != null) {
        $("#intel-votes").text("Intel Votes: " + $.cookie("intelvotes"));
    } else {
        $("#intel-votes").text("Intel Votes: " + 0);
    }

    if ($.cookie("amdvotes") != null) {
        $("#amd-votes").text("AMD Votes: " + $.cookie("amdvotes"));
    } else {
        $("#amd-votes").text("AMD Votes: " + 0);
    }

    if ($.cookie("samsungvotes") != null) {
        $("#samsung-votes").text("SAMSUNG Votes: " + $.cookie("samsungvotes"));
    } else {
        $("#samsung-votes").text("SAMSUNG Votes: " + 0);
    }

    $("input#conferenceId").on('keypress', function (e) {
        if(e.which == 13) { // If you press Enter Key
            if ($(this).val() != "") {
                if ($.cookie($(this).val()) != null) {
                    var currentCookie = JSON.parse($.cookie($(this).val()));
                    console.log(currentCookie);
                    $.each(currentCookie, function(setting, value) {
                        $("#registration input, textarea, select").each(function (index, element) {
                            if (element.type == 'radio') {
                                if ($(element).attr('name') == setting && $(element).val() == value) {
                                    
                                    $(element).prop('checked', true);
                                    if ($(element).attr('name') == 'meal1' && $(element).val() == 'no' && $(element).is(':checked') ) {
                                        $("#dinnerdaytwo").css({ 'display': 'block'});
                                    }
                                }
                            } else if (element.type != 'submit') {
                                if (element.id == setting) {
                                    $(element).val(value)
                                }
                            }
                        });
                    });
    
                    if ($("#no").checked == true){
                        $("#dinnerdaytwo").style.display = 'block';
                    }
                } else {
                    alert("No Conference Vote Data");
                }
            } else {
                window.location = 'registration.html';
            }

        }
    });

    $("#registration").submit(function (e) {
        e.preventDefault();
        if($("#workshopB").checked == true){
            if ($("#workshopD").checked == true || $("#workshopE").checked == true || $("#workshopF").checked == true)
                    alert("The workshop Web Programming is an all day event. Selecting this workshop requires your attendance all day so Session 2 will be be available to register for");
            if ($("#workshopF").checked == true)
                if ($("#workshopG").checked == true || $("#workshopI").checked == true)
                        alert("Choosing Introduction to Cyber-Security requires you to also take Cyber-Forensics/Hacking for Session 3");
            if ($("#workshopH").checked == true)
                if($("#workshopF").checked == false)
                        alert("If you choose Cyber-Forensics/Hacking You must also choose Introduction to Cyber-Security for Session 2");
                        return false;
                }
        else{
            setCookie('registration');
            window.open('thankyou.html');
        }
    });


});

// Cookie Setting Function
function setCookie(formname) {
    var data = {};

    $("#registration input, textarea, select").each(function (index, element) {
        if (element.type == 'radio') {
            if ($(element).is(":checked")) {
                data[element.name] = $(element).val();
            }
        } else if (element.type != 'submit'){
            data[element.id] = $(element).val();
        }
    });

    var date = new Date();
    var minutes = 60; // Set Cookie Expiration Time as 60 mins
    date.setTime(date.getTime() + (minutes * 60 * 1000));

    $.cookie(123456, JSON.stringify(data), { expires: date });
}
