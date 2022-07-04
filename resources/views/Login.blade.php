<!doctype html>
<html lang="en">
<head>
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
                    <form>
                        <div class="mb-3">
                           <input id="username" type="text" class="form-control" placeholder="Enter Your Username"/>
                        </div>
                        <div class="mb-3">
                            <input id="password" type="password" class="form-control" placeholder="Enter Your password"/>
                        </div>
                        <input id="loginBtn" type="submit" class="btn normal-btn w-100" value="Login"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>

