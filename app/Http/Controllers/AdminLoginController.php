<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdminLoginModel;

class AdminLoginController extends Controller
{
    function LoginPage(){
        return view('Login');
    }

//   function onLogin(Request $request){
//        $UserName = $request->UserName;
//        $Password = $request->Password;
//        $count=AdminLoginModel::where('username','=',$UserName)->where('password','=',$Password)->count();
//        //$count = AdminLoginModel::where('username',$UserName)->where('password',$Password)->count();
//
//        if($count==1){
//            $request->session()->put('UserNameKey',$UserName);
//            return "1";
//        }else{
//            return "0";
//        }
//   }


    function onLogin(Request $request){
        $UserName =$request->input('user');
        $Password =$request->input('pass');
        $count=AdminLoginModel::where('username',$UserName)->where('password',$Password)->count();
        if($count==1){
            $request->session()->put('userNameKey',$UserName);
            return 1;
        }else{
            return 0;
        }
    }

    function onLogout(Request $request){
        $request->session()->flush('userNameKey');
        return redirect('/login');
    }
}
