<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace YY\Controllers;

use Phalcon\Mvc\Controller;
use YY\Utils\MySqlDB;
use Phalcon\Db;

class GetController extends Controller {

    //public $baseUrl = "http://ds.idc.xiwanglife.com/dataservice/getconfig.do?id=";
    public $baseUrl = "http://10.127.3.101:8080/dataservice/getconfig.do?id=";

    public function assetsProgressAction() {//首页
        $id = 63;
//        $start = $this->request->get('day');
//        $yestoday = date("Ymd", strtotime("$start -1 day"));
//        $beforeYestoday = date("Ymd", strtotime("$start -2 day"));
        $ch = curl_init();
//        
//        $url = $this->baseUrl . $id .
//                "&today=" . $start . "&yesterday=" . $yestoday . "&yesterday2=" . $beforeYestoday;
//        //echo $url;
//        $data = array(
//            'id' => $id,
//            'today' => $start
//        );

        $url = $this->baseUrl . $id;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_exec($ch);
        $r = curl_multi_getcontent($ch);
        if (curl_errno($ch)) {
            echo curl_error($ch);
        } else {
            curl_close($ch);
        }
        echo $r;
    }

    public function productProgressAction() {
        $id = 64;
        $assets_id = $this->request->get('assets_id');

        $ch = curl_init();

        $url = $this->baseUrl . $id . "&assets_id=" . $assets_id;

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_exec($ch);
        $r = curl_multi_getcontent($ch);
        if (curl_errno($ch)) {
            echo curl_error($ch);
        } else {
            curl_close($ch);
        }
        echo $r;
    }

    public function assetsBaseInfoAction() {
        $id = 67;

        $ch = curl_init();

        $url = $this->baseUrl . $id;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_exec($ch);
        $r = curl_multi_getcontent($ch);
        if (curl_errno($ch)) {
            echo curl_error($ch);
        } else {
            curl_close($ch);
        }
        echo $r;
    }

    public function loanAmountAction() {
        $id = 70;

        $ch = curl_init();

        $url = $this->baseUrl . $id;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_exec($ch);
        $r = curl_multi_getcontent($ch);
        if (curl_errno($ch)) {
            echo curl_error($ch);
        } else {
            curl_close($ch);
        }
        echo $r;
    }

    public function downExcelAction() {
        $excel = $this->request->get('excel');
        $filename = $this->request->get('filename');
        header('Content-Type:application/vnd.ms-excel');
        //下载显示的名字 
        header('Content-Disposition: attachment; filename="' . $filename . '.xls"');
        $excel = $this->request->get('excel');
        echo $excel;
    }

}
