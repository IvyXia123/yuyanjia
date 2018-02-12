<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace YY\Controllers;

use Phalcon\Mvc\Controller;
use ClusterMan\utils\MySqlDB;

class PagesController extends Controller {
    //    /pages/xx
    public function indexAction() {
        $page = $this->dispatcher->getParam("page");
        $this->view->pick("pages/".$page);
//        $page = $this->dispatcher->getParam("page");
//        if($page){
//            $this->view->pick("reports/".$page);
//        }
    }
    

}
