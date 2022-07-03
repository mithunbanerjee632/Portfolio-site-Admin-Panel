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
}
