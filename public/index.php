<?php

use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Application;
use Phalcon\Di\FactoryDefault;
use YY\Plugins\ActionAcl,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Crypt,
    Phalcon\Mvc\Router,
    Phalcon\Events\Event;

try {

//    $debug = new \Phalcon\Debug();
//    $debug->listen();

    $loader = new Loader();
    $loader->registerNamespaces(
            array(
                'YY\Utils' => '../app/utils/',
                'YY\Plugins' => '../app/plugins/',
                'YY\Controllers' => '../app/controllers/',
            )
    );
    $loader->registerDirs(array(
        '../app/controllers/',
        '../app/models/',
        '../app/conf/'
    ));
    $loader->register();

    $di = new FactoryDefault();

    $di->set('view', function () {
        $view = new View();
        $view->setViewsDir('../app/views/');
        return $view;
    });
    
    
    $di->set('dispatcher', function() use ($di) {
        $dispatcher = new Dispatcher();
        $dispatcher->setDefaultNamespace("YY\Controllers");

        $eventsManager = $di->getShared('eventsManager');
        $actionAcl = new ActionAcl($di);
        $eventsManager->attach('dispatch', $actionAcl);

        $dispatcher->setEventsManager($eventsManager);

        return $dispatcher;
    });

    $di->set('router', function () {

        $router = new Router();
        $router->add("/pages/{page}", array(
            'controller' => 'pages',
            'action' => 'index',
            'page' => 1
        ));
//        $router->add("/reports", array(
//            'controller' => 'reports',
//            'action' => 'index'
//        ));

        return $router;
    });

    $di->set('crypt', function() {
        $crypt = new Crypt();
        $crypt->setKey('zhaopengzhaopeng');
        return $crypt;
    });

//    $services = $di->getServices();
//    foreach ($services as $key => $value) {
//        var_dump($key);
//        var_dump(get_class($di->get($key)));
//    }

    $application = new Application($di);

    echo $application->handle()->getContent();
} catch (\Exception $e) {
    echo "Exception: ", $e->getMessage();
}