function createOption(selBox, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    selBox.options.add(opt);
  }
  
  async function confirm_cp(){
      var zip = document.getElementById("zip").value;
      var dropdown = document.getElementById("order-day");
      var pattern1 ="[0-9]{5}";
       if (zip.match(pattern1)){
  
      let date = await axios.post('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/statuses-dlxhb/service/confirm_zip/incoming_webhook/confirm_zip', {zip: zip});
      window.date = date;
      console.log(date)
  
      if(dropdown.options.length>0){
      var length = dropdown.options.length;
      for (i = length-1; i >= 0; i--) {
       dropdown.options[i] = null;
      }
    }
    for (i = 0; i< date.data.length; i++){
      
      var new_date = Number(date.data[i].date.$date.$numberLong);
      var day = new Date(new_date)
      var new_date_string = day.getDate()+"-"+day.getMonth()+"-"+day.getFullYear()
      createOption(dropdown, new_date_string, new_date);
    }
    document.getElementById("order-day").disabled = false;
    document.getElementById("order-time").disabled = false;
    document.getElementById("marca").disabled = false;
    document.getElementById("modelo").disabled = false;
    document.getElementById("Nombre").disabled = false;
    document.getElementById("phone").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("search_input").disabled = false;
  }
}

    //  for (i = 0; i< date.data.length; i++){
      //  var now = new Date();
      //  var numberLong = Number(date.data[i].date.$date.$numberLong);
      //  var new_date = new Date(numberLong);
      //  new_date = new_date.getDate()+"-"+(new_date.getMonth()+1)+"-"+new_date.getFullYear();
      //  var times = Object.entries(date.data[i].times);
      //  console.log(times)
      //  for(j = 0; j<times.length; j++){
      //    if(times[j][1].$numberInt>0 && numberLong>now){
      //    createOption(dropdown, new_date, date.data[i].date.$date.$numberLong);
      //      break;
      //    }
    //  }
   // }
     //document.getElementById("firstName").disabled = false;
     //document.getElementById("lastName").disabled = false;
     //document.getElementById("email").disabled = false;
     //document.getElementById("search_input").disabled = false;
     //document.getElementById("phone").disabled = false;
     //document.getElementById("ddl3").disabled = false;
     //document.getElementById("ddl4").disabled = false;

    async function time(ddl3, ddl4){

      switch (ddl3.value){
      case ddl3.value: 
      ddl4.options.length = 0;
      var day = Number(ddl3.value);
      day = new Date(day)

      for (i = 0; i<date.data.length; i++){
        if (ddl3.value == date.data[i].date.$date.$numberLong){
          var appointments = date.data[i].appointments;
          for (j = 0; j<appointments.length; j++){
              var new_date = new Date(Number(appointments[j].$date.$numberLong))
              var day = new_date.getHours() + ": " + new_date.getMinutes()
            createOption(ddl4, day, appointments[j].$date.$numberLong  );
          }

        }
      }
      }

    }
         
      





  
  async function create_dropdown(ddl3, ddl4){
    var now = new Date();

    switch (ddl3.value) {
    case ddl3.value:
      ddl4.options.length = 0;
      var day = Number(ddl3.value);
      day = new Date(day)
      console.log(day.getFullYear(), day.getMonth()-1, day.getDate())
    for (i = 0; i< date.data.length; i++){
      if (ddl3.value == date.data[i].date.$date.$numberLong){
        var times = Object.entries(date.data[i].times);
        console.log(times)
        for (j = 0; j<times.length; j++){
          if(times[j][1].$numberInt>0){
            var time = times[j][0].toString();
            var time_slice = time.split(":")
            var new_day = new Date(day.getFullYear(), day.getMonth(), day.getDate(), time_slice[0], time_slice[1], 0, 0);
           console.log(new_day)
            if (new_day.getTime()>now.getTime()){
          
         createOption(ddl4, time);
            }
          //createOption(ddl4, times[j][1].$numberInt)
          }
              }
            }
          }
          break;
        } 
      }