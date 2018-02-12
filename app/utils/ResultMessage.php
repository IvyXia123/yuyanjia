<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace ClusterMan\utils;

/**
 * Description of ResultMessage
 *
 * @author zhaopeng
 */
class ResultMessage {
    
    public $code = 0;
    public $message = "";
    
    function getCode() {
        return $this->code;
    }

    function getMessage() {
        return $this->message;
    }

    function setCode($code) {
        $this->code = $code;
    }

    function setMessage($message) {
        $this->message = $message;
    }
    
    function toJson(){
        return json_encode($this);
    }

}
