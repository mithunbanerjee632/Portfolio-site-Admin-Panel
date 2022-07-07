<?php

namespace App\Http\Controllers;

use App\Models\ServiceModel;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    function ServiceList(){
        $result = ServiceModel::all();
        return $result;
    }

    function  ServiceDelete(Request $request){
        $id = $request->input('id');
        $result= ServiceModel::where('id','=',$id)->delete();
        return $result;
    }

    function AddService(Request $request){
        $name = $request->input('name');
        $des = $request->input('des');
        $logoPath = $request->file('logo')->store('public');
        $logoName = explode('/',$logoPath)[1];
        $logoUrl = "http://".$_SERVER['HTTP_HOST']."/storage/".$logoName;

        $result = ServiceModel::insert(['service_name'=>$name,'service_description'=>$des,'service_logo'=>$logoUrl]);
        return $result;
    }
}
