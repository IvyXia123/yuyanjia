<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace YY\Controllers;

use Phalcon\Mvc\Controller;
use ClusterMan\utils\MySqlDB;

class IndexController extends Controller {

    public function indexAction() {
        $uri = $this->request->getURI();
        if(!strpos($uri, "index")){
           $this->response->redirect( 'index' ); 
        }
    }
    
    public function testAction() {
        //echo "<h1>Hello888</h1>";
    }
    
    public function doLoginAction(){
        
        $name = $this->request->get('name');
        $pass = $this->request->get('password');
        if($name == "111@163.com" && $pass == "111111"){
            $this->response->redirect( 'index' );  
        }else{
            echo "faild";
        }
        
    }
    
    public function show404Action(){
        echo "没有内容";
    }
    
    public function amountAction() {
        
    }
	
}
