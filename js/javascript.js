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
            window.open('./awards.html');
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
            window.open('./awards.html');
        }
        else if (document.getElementById("samsung").checked == true) {
            if ($.cookie("samsungvotes") == null) {
                $.cookie("samsungvotes", 1, { expires: 365 * 10 });
            } else {
                var currentVotes = parseInt($.cookie("samsungvotes"), { expires: 365 * 10 });
                console.log(currentVotes);
                $.cookie("samsungvotes", currentVotes + 1);
            }
            window.alert("Thank you for Voting for Samsung Exynos Processor Lineup");
            window.open('./awards.html');
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
                return false;

        if (document.getElementById("workshopF").checked == true)
            if (document.getElementById("workshopG").checked == true || document.getElementById("workshopI").checked == true)
                alert("Choosing Introduction to Cyber-Security requires you to also take Cyber-Forensics/Hacking for Session 3");

        if (document.getElementById("workshopH").checked == true)
            if(document.getElementById("workshopF").checked == false)
                alert("If you choose Cyber-Forensics/Hacking You must also choose Introduction to Cyber-Security for Session 2");

                return false;
    }
}


$(document).ready(function () {
    // In the Poll Page Update the Votes Numbers
    if ($.cookie("intelvotes") != null) {
        $("#intel-votes").text("Intel Votes: " + $.cookie("intelvotes")); // After Nominee of Vote Poll Page
        $("#intel-votes-td").text($.cookie("intelvotes")); // Votes Number Update in the Awards Table
    } else {
        $("#intel-votes").text("Intel Votes: " + 0);
        $("#intel-votes-td").text(0);
    }

    if ($.cookie("amdvotes") != null) {
        $("#amd-votes").text("AMD Votes: " + $.cookie("amdvotes"));
        $("#amd-votes-td").text($.cookie("amdvotes"));
    } else {
        $("#amd-votes").text("AMD Votes: " + 0);
        $("#amd-votes-td").text(0);
    }

    if ($.cookie("samsungvotes") != null) {
        $("#samsung-votes").text("SAMSUNG Votes: " + $.cookie("samsungvotes"));
        $("#samsung-votes-td").text($.cookie("samsungvotes"));
    } else {
        $("#samsung-votes").text("SAMSUNG Votes: " + 0);
        $("#samsung-votes-td").text(0);
    }

    // In the registration Page Check the Conference ID when User click Enter Key after inputing the ID
    $("input#conferenceId").on('keypress', function (e) {
        if(e.which == 13) { // If you press Enter Key
            if ($(this).val() != "") {
                if ($.cookie($(this).val()) != null) {
                    var currentCookie = JSON.parse($.cookie($(this).val()));
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

    // Registration Info Submit Function
    $("#registration").submit(function (e) {
        e.preventDefault();
        // This is the function you have mentioned
        if (!validate()) return false;

        if ($("#conferenceId").val() == '' ) {
            alert("Please Input the Conference ID");
        } else if ($("#conferenceId").val().length < 6) {
            alert("Conference ID should be 6 digits");
        } else {
            setCookie('registration');
            window.open('thankyou.html');
        }
    });

});

// Cookie Setting Function
function setCookie(formname) {
    var data = {};
    // Save Registration Data in the Array
    $("#registration input, textarea, select").each(function (index, element) {
        if (element.type == 'radio') {
            if ($(element).is(":checked")) {
                data[element.name] = $(element).val();
            }
        } else if (element.type != 'submit'){
            data[element.id] = $(element).val();
        }
    });

    // Set Cookie Expiration Time
    var date = new Date();
    var minutes = 60; // Set Cookie Expiration Time as 60 mins
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    
    $.cookie($("#conferenceId").val(), JSON.stringify(data), { expires: date });
}
