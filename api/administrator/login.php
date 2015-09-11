<?php
session_start();
$err = '';
if(isset($_SESSION['username'])){
    header('Location: index.php');
}
if(isset($_POST['submit'])){
    $fields = array(
        'username' => $_POST['username'],
        'password' => $_POST['password']
    );

    $stream_options = array(
        'http' => array(
            'method'  => 'POST',
            'header'  => 'Content-type: application/x-www-form-urlencoded' . "\r\n",
            'content' =>  http_build_query($fields)));

    $context  = stream_context_create($stream_options);
    $response = file_get_contents("http://api.kajian.org/users/auth", null, $context);
    
    if($response){
        $data = json_decode($response);
        if($data->status){
            $_SESSION['username'] = 'admin';
            header('Location: index.php');
        }else{
            $err = 'Username atau password salah';
        }

    }

}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>AdminLTE 2 | Log in</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Al Munaworoh</title>
    <link rel="stylesheet" href="./libs/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="./libs/bootstrap/dist/css/bootstrap-theme.css">
    <link rel="stylesheet" href="./css/AdminLTE.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="./css/skins/skin-green.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="./css/style.css" type="text/css" media="screen" title="no title" charset="utf-8">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="#"><b>AL</b>MUNAWAROH</a>
      </div><!-- /.login-logo -->
      <div class="login-box-body">
      <p class="login-box-msg"><?php echo $err ?></p>
        <form action="login.php" method="post">
          <div class="form-group has-feedback">
            <input type="username" name="username" class="form-control" placeholder="Username">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" name="password" class="form-control" placeholder="Password">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">

            <div class="col-xs-4">
            </div>
            <div class="col-xs-4">
              <button type="submit" class="btn btn-primary btn-block btn-flat" name="submit">Sign In</button>
            </div><!-- /.col -->
          </div>
        </form>


      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->

  </body>
</html>


