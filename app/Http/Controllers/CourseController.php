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

    function CourseAdd(Request $request){
        $title = $request->input('title');
        $des = $request->input('des');
        $LongTitle = $request->input('LongTitle');
        $LongDes = $request->input('LongDes');
        $TotalLec = $request->input('TotalLec');
        $TotalStu = $request->input('TotalStu');
        $skill = $request->input('skill');
        $CourseLink = $request->input('CourseLink');

        $imagePath = $request->file('image')->store('public');
        $imageName = explode('/',$imagePath)[1];
        $imageUrl = "/storage/".$imageName;

        $videoPath = $request->file('video')->store('public');
        $videoName = explode('/',$videoPath)[1];
        $videoUrl ="http://".$_SERVER['HTTP_HOST']."/storage/".$videoName;

        $result = CourseTableModel::insert([
            'short_title'=>$title,
            'short_des'=>$des,
            'small_img'=>$imageUrl,
            'long_title'=>$LongTitle,
            'long_des'=>$LongDes,
            'total_lecture'=>$TotalLec,
            'total_student'=>$TotalStu,
            'skill_all'=>$skill,
            'video_url'=>$videoUrl,
            'course_link'=>$CourseLink
        ]);

        return $result;
    }
}
