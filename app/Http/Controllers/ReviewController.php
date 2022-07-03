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
}
