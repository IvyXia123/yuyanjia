<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MySqlDB
 *
 * @author zp
 */
namespace YY\Utils;

use \Phalcon\Db\Adapter\Pdo\Mysql;

class MySqlDB {

    function __construct() {
        
    }
    
    public static function  getConnection() {

        $config = array(
            "host" => "127.0.0.1",
            "username" => "root",
            "password" => "",
            "dbname" => "assets_bi",
            'charset' => 'UTF8',
            "options" => array(
                \PDO::ATTR_EMULATE_PREPARES => false
                //PDO::ATTR_CASE => PDO::CASE_LOWER
            )
        );
        $connection = new \Phalcon\Db\Adapter\Pdo\Mysql($config);
        return $connection;
    }

}
