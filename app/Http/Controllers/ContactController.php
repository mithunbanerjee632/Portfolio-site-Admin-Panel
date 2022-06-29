<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactTableModel;
class ContactController extends Controller
{
    function ContactList(){
        $result = ContactTableModel::all();
        return $result;
    }
}
