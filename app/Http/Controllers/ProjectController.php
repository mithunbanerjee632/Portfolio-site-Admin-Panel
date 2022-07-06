<?php

namespace App\Http\Controllers;

use App\Models\ProjectModel;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    function ProjectList(){
        $result = ProjectModel::all();
        return $result;
    }

    function  ProjectDelete(Request $request){
        $id = $request->input('id');
        $result= ProjectModel::where('id','=',$id)->delete();
        return $result;
    }

    function AddProject(Request $request){
        $name     = $request->input('name');
        $des      = $request->input('des');
        $features = $request->input('features');
        $preview  = $request->input('preview');

        $imgOnePath   = $request->file('imgOne')->store('public');
        $imgOneName = explode("/",$imgOnePath)[1];
        $imgOneUrl = "/storage/".$imgOneName;

        $imgTwoPath   = $request->file('imgTwo')->store('public');
        $imgTwoName = explode("/",$imgTwoPath)[1];
        $imgTwoUrl = "/storage/".$imgTwoName;

        $result = ProjectModel::insert([
            'img_one'=>$imgOneUrl,
            'img_two'=>$imgTwoUrl,
            'project_name'=>$name,
            'short_description'=>$des,
            'project_features'=>$features,
            'live_preview'=>$preview
        ]);

    return $result;
    }
}
