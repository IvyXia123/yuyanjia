<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace YY\Controllers;

use Phalcon\Mvc\Controller,
    Phalcon\Db;
use YY\Utils\MySqlDB;

class LoginController extends Controller {

    private $maxPassErrorCount = 5;

    public function getip() {
        $unknown = 'unknown';
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] && strcasecmp($_SERVER['HTTP_X_FORWARDED_FOR'], $unknown)) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] &&
                strcasecmp($_SERVER['REMOTE_ADDR'], $unknown)) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        /*
          处理多层代理的情况
          或者使用正则方式：$ip = preg_match("/[d.]
          {7,15}/", $ip, $matches) ? $matches[0] : $unknown;
         */
        if (false !== strpos($ip, ','))
            $ip = reset(explode(',', $ip));
        return $ip;
    }

    public function indexAction() {

//        $uri = $this->request->getUri();
//        if($uri != "/login"){
//            $this->response->redirect( '/login' );
//            $this->view->disable();
//            return;
//        }

        $passErrorCount = trim($this->cookies->get('pec')->getValue());
        if (strlen($passErrorCount) === 0) {
            $date = date("Ymd");
            $this->cookies->set('pec', $date . '_1', time() + 3600 * 24);
        }
    }

    public function bAction() {
        //ini_set("display_errors","On");   
        //error_reporting(E_ALL); 
//        throw new Exception("11");
//        return xdebug_print_function_stack("stop here!");
//        echo date("Ymd");
        echo $this->request->getUri();
    }

    public function doLoginAction() {

        try {
            $res = array();
            $name = $this->request->get('name');
            $pass = $this->request->get('pass');

            $url = "http://us.xiwanglife.com/userservice/login.do?userName=$name&password=$pass";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_exec($ch);
            $usRes = curl_multi_getcontent($ch);
            if (curl_errno($ch)) {
                echo curl_error($ch);
            } else {
                curl_close($ch);
            }

            $usRes = json_decode($usRes);

            if (isset($usRes->status) && $usRes->status != 200) {
                $res['c'] = -1;
                $res['t'] = '密码错误';
            } else {
                $conn = MySqlDB::getConnection();
                $sql = "select u1.*, u2.name as rank_name,u2.rank from users as u1 join users_rank as u2 where u1.name=? and u1.rid=u2.id";

                $result = $conn->fetchAll($sql, Db::FETCH_ASSOC, [$name, $pass]);
              
                if (count($result) == 0) {
                    $rid = $conn->fetchOne("select id,name from users_rank where name='staff'", Db::FETCH_ASSOC);
                    $rank_name = $rid['name'];
                    $rid = $rid["id"];
                    $sql = "insert into users(name, pass, rid) values($name, $pass, $rid)";
                    //$conn->fetchAll($sql, Db::FETCH_ASSOC, [$name, $pass]);
                    $colums = array("name", "pass", "rid");
                    $values = array($name, $pass, $rid);
                    $conn->insert("users", $values, $colums);
                }else{
                    $rank_name = $result[0]['rank_name'];
                }
                
                $expire = time() + 3600 * 24 * 365;

                $this->cookies->set('puser', $rank_name, $expire);
                $this->cookies->set('user', $name, $expire);
                $res['c'] = 0;
                $res['t'] = '/';
            }

            echo json_encode($res);
        } catch (Exception $e) {
            echo $e;
        }
    }

    public function slideAction() {
//        $passErrorArr = preg_split("/_/", trim($this->cookies->get('pec')->getValue()));
//
//        $passErrorDate = $passErrorArr[0];
//        $passErrorCount = $passErrorArr[1];
//        if ($passErrorCount > $this->maxPassErrorCount) {
//            echo "{error:1}";
//        } else {
//            $this->cookies->set('s', 'ok');
//            echo 0;
//        }
        $this->cookies->set('s', 'ok');
        echo 0;
    }

    public function logoutAction() {
        $this->cookies->set('pp', 'exit', 3600 * 24);
        echo 0;
    }

}
