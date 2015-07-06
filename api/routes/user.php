<?php
use Phalcon\Http\Response;

//Retrieves robots based on primary key
$app->get('/users/find/{name}', function($name) use ($app) {

    $phql = "SELECT * FROM User WHERE username = :name:";
    $users = $app->modelsManager->executeQuery($phql, array(
        'name' => $name
    ));

    $data = array();
    foreach($users as $user){
        $data[] =  array(
            'name' => $user->username
        );
    }

    //Create a response
    $response = new Response();

    if ($data == false) {
        $response->setJsonContent(array('status' => 'NOT-FOUND'));
    } else {
        $response->setJsonContent(array(
            'status' => 'FOUND',
            'data'   => $data
        ));
    }

    return $response;
});

$app->post('/users/register',function() use ($app){

    $user = "data dummy go here" ;
    $phql = "INSERT INTO users (`username`,`password`,`firstname`,`lastname`,`created`,`status`) values(:username,\
    :password,:firstname,:lastname,:created,:status)";
    $users = $app->modelsManager->executeQuery($phql,array(
        'username'  => $user->username,
        'password'  => $user->password,
        'firstname' => $user->firstname,
        'lastname'  => $user->lastname,
        'created'   => $user->created,
        'status'    => $user->status
    ));
});
