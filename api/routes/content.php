<?php
use Phalcon\Http\Response;

$app->get('/content/{id}', function($id) use ($app) {
    $phql = "SELECT * FROM Content WHERE id_content=:id_content:";
    $robots = $app->modelsManager->executeQuery($phql, array(
        'id_content' => $id
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
$app->get('/content', function() use ($app) {

    $phql = "SELECT id_content,judul, type, body, c.deskripsi, c.id_kategori, kategori, body, id_user, status, uploadedAt FROM Content c 
        INNER JOIN Kategori k ON c.id_kategori = k.id_kategori";
    $robots = $app->modelsManager->executeQuery($phql);

    //Create a response
    $response = new Response();

    $data = array();
    foreach($robots as $robot){
        array_push($data, $robot);
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


$app->post('/content',function() use ($app){
    $robots = $app->request->getPost();
    $robots = json_decode($robots['data']);


    $phql = "INSERT INTO Content (id_kategori,id_user,judul,body,type,deskripsi,status,uploadedAt) 
        values(:id_kategori:,:id_user:,:judul:,:body:,:type:,:deskripsi:,:status:,:uploadedAt:)";

    if($robots->type == 1){
        if ($app->request->hasFiles() == true) {
            foreach ($app->request->getUploadedFiles() as $file){
                $file->moveTo('data/'.$file->getName());
                $robots->body = $file->getName();
            }

        }
    }
    $status = $app->modelsManager->executeQuery($phql,array(
        'id_kategori' => $robots->id_kategori,
        'id_user'     => $robots->id_user,
        'judul'        => $robots->judul,
        'body'        => $robots->body,
        'type'        => $robots->type,
        'deskripsi'   => $robots->deskripsi,
        'status'      => $robots->status,
        'uploadedAt'  => date('Y-m-d')
    ));


    //Create a response
    $response = new Response();

    //Check if the insertion was successful
    if ($status->success() == true) {

        //Change the HTTP status
        $response->setStatusCode(201, "Created");

        $robots->id_content = $status->getModel()->id_content;

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

$app->put('/content',function() use ($app){
    $robots = $app->request->getJsonRawBody();

    $phql = "UPDATE Content SET
id_kategori = :id_kategori:,id_user = :id_user:,judul = :judul:, body = :body:,type = :type:,
deskripsi = :deskripsi:,status = :status: where id_content = :id_content:";

    $status = $app->modelsManager->executeQuery($phql,array(
        'id_kategori' => $robots->id_kategori,
        'id_user'     => $robots->id_user,
        'judul'        => $robots->judul,
        'body'        => $robots->body,
        'type'        => $robots->type,
        'deskripsi'   => $robots->deskripsi,
        'status'      => $robots->status,
        'id_content'  => $robots->id_content
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


$app->delete('/content/{id}',function($id) use ($app){
    $phql = "DELETE FROM Content WHERE id_content = :id:";
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
