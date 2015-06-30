<?php

use Phalcon\Loader;
use Phalcon\Mvc\Micro;
use Phalcon\DI\FactoryDefault;
use Phalcon\Db\Adapter\Pdo\Mysql as PdoMysql;

// Use Loader() to autoload our model
$loader = new Loader();

$loader->registerDirs(array(
    __DIR__ . '/models/'
))->register();

$di = new FactoryDefault();

//Set up the database service
$di->set('db', function(){
    return new PdoMysql(array(
        "host"      => "localhost",
        "username"  => "root",
        "password"  => "root",
        "dbname"    => "munawaroh"
    ));
});
function _test($data){
    echo "<pre>";
    print_r($data);
    echo "</pre>";
}
//Create and bind the DI to the application
$app = new Micro($di);

$app->get('/',function() use($app){
    echo 'Welcome to kajian API';
});
require_once('routes/content.php');
$app->notFound(function () use ($app) {
    $app->response->setStatusCode(404, "Not Found")->sendHeaders();
    echo 'This is crazy, but this page was not found!';
});
$app->before(function() use ($app) {
    $origin = $app->request->getHeader("ORIGIN") ? $app->request->getHeader("ORIGIN") : '*';
    $content_type = 'application/json';
    $status = 200;
    $description = 'OK';
    $response = $app->response;
    $status_header = 'HTTP/1.1 ' . $status . ' ' . $description;
    $response->setRawHeader($status_header);
    $response->setStatusCode($status, $description);
    $response->setContentType($content_type, 'UTF-8');
    $response->setHeader("Access-Control-Allow-Origin", $origin)
        ->setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS')
        ->setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Range, Content-Disposition, Content-Type, Authorization')
        ->setHeader("Access-Control-Allow-Credentials", true)
        ->setHeader('Content-type',$content_type);
    $response->sendHeaders();
});

$app->options('/{catch:(.*)}', function() use ($app) { 
    $app->response->setStatusCode(200, "OK")->send();
});

$app->handle();
