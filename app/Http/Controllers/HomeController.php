<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClientReviewModel;
use App\Models\ContactTableModel;
use App\Models\CourseTableModel;
use App\Models\ProjectModel;
use App\Models\ServiceModel;

class HomeController extends Controller
{
    function CountSummary(){
        $review=ClientReviewModel::count();
        $contact=ContactTableModel::count();
        $course=CourseTableModel::count();
        $project=ProjectModel::count();
        $service=ServiceModel::count();

        $totalCount=array('review'=>$review,'contact'=>$contact,'course'=>$course,'project'=>$project,'service'=>$service);
        return json_encode($totalCount);
    }
}
