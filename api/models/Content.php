<?php
use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Message;
use Phalcon\Mvc\Model\Validator\Uniqueness;
use Phalcon\Mvc\Model\Validator\InclusionIn;

class Content extends Model
{
    public function initialize(){
        $this->belongsTo("id_user", "User", "id_user", array(
            "foreignKey" => array(
                "message" => "id_user does not exist on the User model"
            )
        ));
        $this->belongsTo("id_kategori", "Kategori", "id_kategori",array(
            "foreignKey" => array(
                "message" =>"id_kategori does not exist on the Kategori model"
            )
        ));
    }
    public function validation(){
        $this->validate(new InclusionIn(
            array(
                "field"  => "type",
                "domain" => array(1,2,3)
            )
        ));
        //Check if any messages have been produced
        if ($this->validationHasFailed() == true) {
            return false;
        }
    }
}
