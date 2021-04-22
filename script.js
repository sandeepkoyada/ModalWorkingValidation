var selectedRow = null

function FormData() {
      $("#sucessfulsub").text("Details Submitted Succesfully")
        var formData = reader();
       
        if (selectedRow == null){
            newData(formData);
        }
        else
            update(formData);
}

function reader() {
    var formData = {};
    formData["username"] = $("#uname").val();
    formData["fname"] = $("#fname").val();
    formData["lname"] = $("#lname").val();
    formData["email"] = $("#email").val();
    formData["phone"] = $("#phone").val();

    return formData;
}

function newData(data) {
    var table = document.getElementById("usertable");
    var newRow = table.insertRow(table.rows.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.username;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.fname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.lname;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.phone;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<a onclick="editfun(this)"><p data-toggle='modal' data-target='#exampleModal' >Edit <span class='glyphicon glyphicon-pencil'></span></p></a>`;
  }

function EmptyForm() {
  $("#failedid").text("")
  $("#sucessfulsub").text("")
  $("#basic-form").data('validator').resetForm();
  $("label").removeClass("error.fail-alert");
  $("input").removeClass("valid success-alert");
  $("input").removeClass("error");
  $("label").removeClass("error");
  $("textarea").removeClass("error");

    $("#uname").val('')
    $("#fname").val('') 
    $("#lname").val('') 
    $("#email").val('') 
    $("#phone").val('') 
    
    selectedRow = null;
}

function editfun(td) {
  
    selectedRow = td.parentElement.parentElement;
    $("#uname").val(selectedRow.cells[0].innerHTML)  
    $("#fname").val(selectedRow.cells[1].innerHTML) 
    $("#lname").val(selectedRow.cells[2].innerHTML) 
    $("#email").val(selectedRow.cells[3].innerHTML) 
    $("#phone").val(selectedRow.cells[4].innerHTML)
    
}
function update(formData) {
    selectedRow.cells[0].innerHTML  = formData.username;
    selectedRow.cells[1].innerHTML = formData.fname;
    selectedRow.cells[2].innerHTML = formData.lname;
    selectedRow.cells[3].innerHTML = formData.email;
    selectedRow.cells[4].innerHTML = formData.phone;
}



window.onload = function() 
{
  if(localStorage.length>0){
      var retrievedData = localStorage.getItem("quentinTarantino");

      var movies2 = JSON.parse(retrievedData);

      var student=""

  $.each(movies2, function (key, value) {
  
    student += '<tr>';
      student += '<td>' + 
        value.username + '</td>';

      student += '<td>' + 
        value.firstname + '</td>';

      student += '<td>' + 
        value.lastname + '</td>';

      student += '<td>' + 
        value.email + '</td>';
    
      student += '<td>' + 
        value.phone + '</td>';

      student+='<td>'+ `<a onclick="editfun(this)"><p data-toggle='modal' data-target='#exampleModal' >Edit <span class='glyphicon glyphicon-pencil'></span></p></a>`+
    '</td>'
          student += '</tr>';
});

$('#usertable').append(student);
}
else
$("#sucessfulsub").text("No Data Available in local storage")

}

//document ready

$(document).ready(function() {

  $("#delid").click(function(){
    $("#sucessfulsub").text("Data Deleted From localstorage refresh page")
    localStorage.clear();
    });

    $("#modalid").click(function(){
      validate();
      EmptyForm();
    });

    $("#submitid").click(function(event){
        event.preventDefault();
        FormData(); 
    });
    
    $("#saveid").click(function(event){

      $("#sucessfulsub").text("Details Saved")
      var table = document.getElementById("usertable");

      var data = [];
    var headers = [];
    for (var i=0; i<table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    }
    for (var i=1; i<table.rows.length; i++) {

        var tableRow = table.rows[i];
        var rowData = {};

        for (var j=0; j<tableRow.cells.length; j++) {

            rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

        }

        data.push(rowData);
    }
    var kaat=JSON.stringify(data)
       
    localStorage.setItem("quentinTarantino", kaat);
    
    console.log(kaat)

  });


  var toValidate = jQuery('#uname, #fname, #lname, #email,#phone'),
    valid = false;
toValidate.keyup(function () {
    if (jQuery(this).val().length > 0) {
        jQuery(this).data('valid', true);
    } else {
        jQuery(this).data('valid', false);
    }
    toValidate.each(function () {
        if (jQuery(this).data('valid') == true) {
            valid = true;
        } else {
            valid = false;
        }
    });
    if (valid === true) {
        jQuery("#submitid").prop('disabled', false);
    } else {
      $('#submitid').attr("data-dismiss","modal");  
        jQuery("#submitid").prop('disabled', true);
    }
});
    });
  
    //jquery validation
    function validate(){
        $("#basic-form").validate({
            errorClass: "error fail-alert",
            validClass: "valid success-alert",
            rules: {
              uname : {
                required: true,
                minlength: 3
                
              },
              fname : {
                  required: true,
                  minlength:1
                  
                },
                lname : {
                  required: true,
                  minlength:1
                  
                },
              email: {
                required: true,
                email: true,
                customemail:true
              },
              phone : {
                required: true,
                number: true,
                minlength: 10,
            maxlength: 10
              }
            },
            messages : {
              name: {
                minlength: "User Name should be at least 3 characters"
              },
              name: {
                required: "Please enter first name",
                minlength: "User Name should be at least 3 characters"
                
              },
              name:{
                required:"please enter last name",
                minlength: "User Name should be at least 3 characters"
                
              },
              email: {
                email: "The email should be in the format: abc@domain.tld"
              },
              phone: {
                required: "please enter phone number",
                number: "only numeric values allowed",
                minlength:"phone should be 10 digits",
                maxlength:"phone should be 10 digits"
              }
            }
          });
    }
    $.validator.addMethod("customemail", 
    function(value, element) {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.((com)|(org)|(co.in)|(net))$/.test(value);
    }, 
    "Sorry, the domain extension is not allowed."
);
  


























// function validation(){

//       let utrue=false;
//       if($("#uname").val().length>=3){
//          utrue=true
//       }

//       let ftrue=false;
//       if($("#fname").val().length>=1){
//         ftrue=true;
//       }

//       let ltrue=false;
//       if($("#lname").val().length>=1){
//         ltrue=true;
//       }

//       let isemail;
//         var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//         var email=$("#email").val()
//         if(regex.test(email)) {
//           isemail= true;
//         }

//       let ptrue=false;
//       if($("#phone").val().length===10){
//          ptrue=true;
//       }


//       if(utrue==false || ftrue==false ||  ltrue==false || ptrue==false || isemail==false) {
//         $("#failedid").text("please enter all the details")
//         $('#submitid').removeAttr('data-dismiss');
//         return false;
        
//        }
//        else{
//         $("#failedid").text("")
//         $('#submitid').attr("data-dismiss","modal");  
//        return true;
//        }
    
// }


































// function validate() {

//     var isValid=false;
//     var unameisValid=true;
//         if (document.getElementById("username").value == "") {
//             document.getElementById("unamevalid").innerHTML="please enter user Name";
//             unameisValid=false;
//         }
//     var fnameisValid=true;
//         if (document.getElementById("fname").value == "") {
//             document.getElementById("fnameValid").innerHTML="please enter first  Name";
//             fnameisValid=false;
//         }
//     var lnameisValid=true;
//         if (document.getElementById("lname").value == "") {
//             document.getElementById("lnameValid").innerHTML="please enter last Name";
//             lnameisValid=false;
//         }
//     var emailisValid=true;
//         if (document.getElementById("email").value == "") {
//             document.getElementById("emailValid").innerHTML="please enter email  Name";
//             emailisValid=false;
//         }
//     var phoneisValid=true;
//         if (document.getElementById("phone").value == ""  ) {
//             document.getElementById("phoneValid").innerHTML="please enter phone ";
//             phoneisValid=false;
//         }
        
//     var phonecountValid=true;

//         if (document.getElementById("phone").value.length<10 ) {
//             document.getElementById("phoneCountValid").innerHTML="please enter 10 digits of phone number ";
//             phonecountValid=false;
//         }
       
//         var unameisValidtrue =false
//         if(unameisValid ){
//             document.getElementById("unamevalid").innerHTML="";
//             unameisValidtrue= true;
            
//         }
//         var fnameisValidtrue =false
//         if(fnameisValid ){
       
//             document.getElementById("fnameValid").innerHTML="";
//             fnameisValidtrue= true;
//         }
//         var lnameisValidtrue =false
//         if( lnameisValid ){
           
//             document.getElementById("lnameValid").innerHTML="";
//             lnameisValidtrue= true;   
//         }
//         var emailisValidtrue=false
//         if(emailisValid){
            
//             document.getElementById("emailValid").innerHTML="";
            
//             emailisValidtrue= true;
//         }
//         var phoneisValidtrue=false
//         if(phoneisValid){
            
//             document.getElementById("phoneValid").innerHTML="";
//             phoneisValidtrue= true;
            
//         }
//         var phonecountValidtrue=false
//         if(phonecountValid){
//             document.getElementById("phoneCountValid").innerHTML="";
//             phonecountValidtrue= true;
            
//         }

//     if(unameisValidtrue && fnameisValidtrue && lnameisValidtrue && emailisValidtrue && phoneisValidtrue && phonecountValidtrue){
//         document.getElementById("unamevalid").innerHTML="";
//         document.getElementById("fnameValid").innerHTML="";
//         document.getElementById("lnameValid").innerHTML="";
//         document.getElementById("emailValid").innerHTML="";
//         document.getElementById("phoneValid").innerHTML="";
//         document.getElementById("phoneCountValid").innerHTML="";
//         isValid= true;
//     }
    
//     return isValid;
        
        

// }
