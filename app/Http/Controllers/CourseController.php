<?php

namespace App\Http\Controllers;

use App\Models\CourseTableModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    function CourseList(){
        $result = CourseTableModel::all();
        return $result;
    }

    function  CourseDelete(Request $request){
        $id = $request->input('id');

        $img = CourseTableModel::where('id','=',$id)->get('small_img');
        $imgName = explode('/',$img[0]['small_img'])[4];
        Storage::delete('public/'.$imgName);

        $video = CourseTableModel::where('id','=',$id)->get('video_url');
        $videoName = explode('/',$video[0]['video_url'])[4];
        Storage::delete('public/'.$videoName);

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
        $imageUrl ="http://".$_SERVER['HTTP_HOST']."/storage/".$imageName;

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
