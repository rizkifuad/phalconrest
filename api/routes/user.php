<?php
use Phalcon\Http\Response;

//Retrieves robots based on primary key
$app->post('/users/auth', function() use ($app) {
    $robots = $app->request->getPost();
    $phql = "SELECT * FROM User WHERE username = :username: and password = :password:";
    $users = $app->modelsManager->executeQuery($phql, array(
        'username' => $robots['username'],
        'password' => $robots['password']
    ));

    $data = false;
    if(count($users) == 1){
        $data = true;
    }

    //Create a response
    $response = new Response();

    $response->setJsonContent(array(
        'status'   => $data
        ));

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

