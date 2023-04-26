<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
Use Auth;



class RegisterController extends Controller
{
    Private $status = 200;
       
    public function Register(Request $req)
    {
       
             $user = new User;
             $user->username=$req->input('username');
             $user->email=$req->input('email');
             $user->password=Hash::make($req->input('password'));
             $user->confirmpassword=Hash::make($req->input('confirmpassword'));
             $user->role=$req->input('role');
             $user->save();
       }  
               
          

    public function Login(Request $req)
    {
       $user = User::where('email',$req->email)->first();
 
       $role = $user->role;
       if(!$user || !Hash::check($req->password,$user->password))
       {
            return["loginVal"=>"error"];
       }else{
            return ["loginVal"=> "true",
               "role"=>$role,
          ]; 
       }

       return $user; 
    }

    public function UsersList() {
    
      $userlist = User::all();
          if(count($userlist) > 0) {
              return response()->json(["status" => $this->status, "success" => true, 
                          "count" => count($userlist), "data" => $userlist]);
          }
          else {
              return response()->json(["status" => "failed",
              "success" => false, "message" => "Whoops! no record found"]);
          }
      }

      public function UsersListDelete($id){

         $Userdel =User::find($id);
         $Userdel->delete();
         return response()->json(
             ["status" => $this->status, "success" => true, 
             "message" => " Congregation deleted  successfully"]);
     }

     public function UserEdit($id){
           
      $UserEdit = User::where('id',$id)->get();
      if(count($UserEdit) > 0) {
          return response()->json(["status" => $this->status, "success" => true, 
                      "count" => count($UserEdit), "data" => $UserEdit]);
      }
      else {
          return response()->json(["status" => "failed",
          "success" => false, "message" => "Whoops! no record found"]);
      }
  }

    public function Userupdate($id,Request $request){
            
        $Userupdate = User::where('id',$id)
        ->update([
            "username" => $request->username,
            "email" => $request->email,
            // "password" => $request->password,
            // "confirmpassword" => $request->confirmpassword,
            "role" => $request->role,  
        ]);
        return response()->json(
            ["status" => $this->status, "success" => true, 
            "message" => " Congregation updated  successfully"]);
    }


}  

