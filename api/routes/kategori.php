<?php
use Phalcon\Http\Response;

$app->get('/kategori/{id}', function($id) use ($app) {
    $phql = "SELECT * FROM Kategori WHERE id_kategori=:id_kategori:";
    $robots = $app->modelsManager->executeQuery($phql, array(
        'id_kategori' => $id
    ));

    $data = array();
    foreach($robots as $robot){
        array_push($data,$robot);
    }

    //Create a response
    $response = new Response();

    if ($data == false) {
        $response->setJsonContent(array('status' => 'NOT-FOUND'));
    } else {
        $response->setJsonContent(array(
            'status' => 'FOUND',
            'data'   => $data[0]
        ));
    }

    return $response;
});
$app->get('/kategori', function() use ($app) {

    $phql = "SELECT * FROM Kategori";
    $robots = $app->modelsManager->executeQuery($phql);

    //Create a response
    $response = new Response();

    $data = array();
    foreach($robots as $robot){
        array_push($data,$robot);
    }

    if ($data == false || count($data) == 0 ) {
        $response->setJsonContent(array('status' => 'NOT-FOUND'));
    } else {
        $response->setJsonContent(array(
            'status' => 'FOUND',
            'data'   => $data
        ));
    }

    return $response;

});


$app->post('/kategori',function() use ($app){
    $robots = $app->request->getJsonRawBody();

    $phql = "INSERT INTO Kategori (kategori,deskripsi) 
        values(:kategori:,:deskripsi:)";

    $status = $app->modelsManager->executeQuery($phql,array(
        'kategori'   => $robots->kategori,
        'deskripsi'   => $robots->deskripsi
    ));


    //Create a response
    $response = new Response();

    //Check if the insertion was successful
    if ($status->success() == true) {

        //Change the HTTP status
        $response->setStatusCode(201, "Created");

        $robots->id_kategori = $status->getModel()->id_kategori;

        $response->setJsonContent(array('status' => 'OK', 'data' => $robots));

    } else {

        //Change the HTTP status
        $response->setStatusCode(409, "Conflict");

        //Send errors to the client
        $errors = array();
        foreach ($status->getMessages() as $message) {
            $errors[] = $message->getMessage();
        }

        $response->setJsonContent(array('status' => 'ERROR', 'messages' => $errors));
    }

    return $response;
});

$app->put('/kategori',function() use ($app){
    $robots = $app->request->getJsonRawBody();

    $phql = "UPDATE Kategori SET
kategori = :kategori:,deskripsi = :deskripsi: where id_kategori = :id_kategori:";

    $status = $app->modelsManager->executeQuery($phql,array(
        'kategori'    => $robots->kategori,
        'deskripsi'   => $robots->deskripsi,
        'id_kategori' => $robots->id_kategori
    ));


    //Create a response
    $response = new Response();

    //Check if the insertion was successful
    if ($status->success() == true) {

        $response->setJsonContent(array('status' => 'OK'));


    } else {

        //Change the HTTP status
        $response->setStatusCode(409, "Conflict");

        //Send errors to the client
        $errors = array();
        foreach ($status->getMessages() as $message) {
            $errors[] = $message->getMessage();
        }

        $response->setJsonContent(array('status' => 'ERROR', 'messages' => $errors));
    }

    return $response;
});


$app->delete('/kategori/{id}',function($id) use ($app){
    $phql = "DELETE FROM Kategori WHERE id_kategori = :id:";
    $status = $app->modelsManager->executeQuery($phql, array(
        'id' => $id
    ));

    //Create a response
    $response = new Response();

    if ($status->success() == true) {
        $response->setJsonContent(array('status' => 'OK'));
    } else {

        //Change the HTTP status
        $response->setStatusCode(409, "Conflict");

        $errors = array();
        foreach ($status->getMessages() as $message) {
            $errors[] = $message->getMessage();
        }

        $response->setJsonContent(array('status' => 'ERROR', 'messages' => $errors));

    }

    return $response;
});
