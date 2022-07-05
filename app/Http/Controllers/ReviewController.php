<?php

namespace App\Http\Controllers;

use App\Models\ClientReviewModel;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    function ClientReviewList(){
        $result = ClientReviewModel::all();
        return $result;
    }

    function  ClientReviewDelete(Request $request){
        $id = $request->input('id');
        $result= ClientReviewModel::where('id','=',$id)->delete();
        return $result;
    }

    function AddReview(Request $request){
        $title = $request->input('title');
        $des = $request->input('des');
        $photoPath = $request->file('photo')->store('public');
        $photoName = explode('/',$photoPath)[1];
        $photoUrl = $_SERVER['HTTP_HOST']."/storage/".$photoName;

        $result = ClientReviewModel::insert(['client_img'=>$photoUrl,'client_title'=>$title,'client_description'=>$des]);
        return $result;

    }
}
