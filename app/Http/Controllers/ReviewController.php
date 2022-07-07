<?php

namespace App\Http\Controllers;

use App\Models\ClientReviewModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReviewController extends Controller
{
    function ClientReviewList(){
        $result = ClientReviewModel::all();
        return $result;
    }

    function  ClientReviewDelete(Request $request){
        $id = $request->input('id');
        $img = ClientReviewModel::where('id','=',$id)->get('client_img');
        $imgName = explode('/',$img[0]['client_img'])[4];
        Storage::delete('public/'.$imgName);
        $result= ClientReviewModel::where('id','=',$id)->delete();
        return $result;
    }

    function AddReview(Request $request){
        $title=  $request->input('title');
        $des=  $request->input('des');
        $PhotoPath=$request->file('photo')->store('public');
        $PhotoName=explode("/", $PhotoPath)[1];

        $PhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$PhotoName;
        $result= ClientReviewModel::insert(['client_img'=> $PhotoURL,'client_title'=>$title,'client_description'=>$des]);
        return $result;
    }

}
