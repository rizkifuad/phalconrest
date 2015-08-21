<?php
use Phalcon\Http\Response;

$app->get('/event/{id}', function($id) use ($app) {
    $phql = "SELECT * FROM Event WHERE id_event=:id_event:";
    $robots = $app->modelsManager->executeQuery($phql, array(
        'id_event' => $id
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
$app->get('/event', function() use ($app) {

    $phql = "SELECT * FROM Event";
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


$app->post('/event',function() use ($app){
    $robots = $app->request->getJsonRawBody();

    $phql = "INSERT INTO Event (judul,deskripsi,gambar,tanggal,alamat,koordinat,status) 
        values(:judul:,:deskripsi:,:gambar:,:tanggal:,:alamat:,:koordinat:,:status:)";
    $date = DateTime::createFromFormat('d/m/Y',$robots->tanggal);
    $tanggal = $date->format('Y-m-d');

    $status = $app->modelsManager->executeQuery($phql,array(
        'judul'     => $robots->judul,
        'deskripsi' => $robots->deskripsi,
        'gambar'    => $robots->gambar,
        'tanggal'   => $tanggal,
        'alamat'    => $robots->alamat,
        'koordinat' => $robots->koordinat,
        'status'    => $robots->status,

    ));


    //Create a response
    $response = new Response();

    //Check if the insertion was successful
    if ($status->success() == true) {

        //Change the HTTP status
        $response->setStatusCode(201, "Created");

        $robots->id_event = $status->getModel()->id_event;

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

$app->put('/event',function() use ($app){
    $robots = $app->request->getJsonRawBody();

    $phql = "UPDATE Event SET
judul     = :judul:,deskripsi = :deskripsi:,gambar = :gambar:,tanggal = :tanggal:,alamat = :alamat:, koordinat = :koordinat:, status = :status: where id_event = :id_event:";

    $date = DateTime::createFromFormat('d/m/Y',$robots->tanggal);
    $tanggal = $date->format('Y-m-d');
    $status = $app->modelsManager->executeQuery($phql,array(
        'judul'     => $robots->judul,
        'deskripsi' => $robots->deskripsi,
        'gambar'    => $robots->gambar,
        'tanggal'   => $tanggal,
        'alamat'    => $robots->alamat,
        'koordinat' => $robots->koordinat,
        'status'    => $robots->status,
        'id_event'  => $robots->id_event
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


$app->delete('/event/{id}',function($id) use ($app){
    $phql = "DELETE FROM Event WHERE id_event = :id:";
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
