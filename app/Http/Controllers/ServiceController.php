<?php

namespace App\Http\Controllers;

use App\Models\ServiceModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    function ServiceList(){
        $result = ServiceModel::all();
        return $result;
    }

    function  ServiceDelete(Request $request){
        $id = $request->input('id');
        $logo = ServiceModel::where('id','=',$id)->get('service_logo');
        $logoName = explode('/',$logo[0]['service_logo'])[4];
        Storage::delete('public/'.$logoName);

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
