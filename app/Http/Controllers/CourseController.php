<?php

namespace App\Http\Controllers;

use App\Models\CourseTableModel;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    function CourseList(){
        $result = CourseTableModel::all();
        return $result;
    }

    function  CourseDelete(Request $request){
        $id = $request->input('id');
        $result= CourseTableModel::where('id','=',$id)->delete();
        return $result;
    }
}
