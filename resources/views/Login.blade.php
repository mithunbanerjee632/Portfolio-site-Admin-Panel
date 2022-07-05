<!doctype html>
<html lang="en">
<head>
    <title>Admin Login</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="{{asset('css/app.css')}}" rel="stylesheet" >
    <link href="{{asset('css/responsive.css')}}" rel="stylesheet" >
    <link href="{{asset('css/style.css')}}" rel="stylesheet" >

</head>
<body>

<div class="container">
    <div class="row d-flex justify-content-center">
        <div class="col-md-6 text-center mt-5">
            <div class="card">
                <div class="card-header ">
                    <h4 class="title-text">Admin Login</h4><hr>
                </div>
                <div class="card-body">
                    <form class="loginForm">
                        <div class="mb-3">
                           <input id="username" name="username"  type="text" value="" class="form-control" placeholder="Enter Your Username"/>
                        </div>
                        <div class="mb-3">
                            <input id="password" name="password" type="password" value="" class="form-control" placeholder="Enter Your password"/>
                        </div>
                        <button type="submit" id="loginBtn"  class="btn normal-btn w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript">
    $('.loginForm').on('submit',function(event){
        event.preventDefault();
        let formData = $(this).serializeArray();
        let UserName= formData[0]['value'];
        let Password= formData[1]['value'];

        let url="/onLogin";
        axios.post(url,{
            user:UserName,
            pass:Password
        }).then(function(response){
            if(response.status==200 && response.data==1){
                window.location.href="/";
            }else{
                alert("login Failed!");
            }
        }).catch(function(error){
            alert("something went wrong!");
        });

    });




    // function AdminLogin(){
    //     let UserName = document.getElementById('username').value;
    //     let Password = document.getElementById('password').value;




      // let xHttp = new XMLHttpRequest();
      //   xHttp.onreadystatechange=function (){
      //       if(this.status==200 && this.responseText=="1"){
      //          alert("login success");
      //            window.location.href="/";
      //       }else{
      //           alert("login failed");
      //       }
      //
      //   }
      //
      //   xHttp.open("GET","/onLogin/"+UserName+"/"+Password,true);
      //   xHttp.send();
    // }


</script>
<script type="text/javascript" src="{{asset('js/axios.min.js')}}"></script>
</body>
</html>

