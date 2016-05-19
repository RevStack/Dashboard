elliptical.module=(function (app) {

    app = elliptical(); //create the app

    var Service = elliptical.Service;
    var http=elliptical.http;
    var Location = elliptical.Location;
    var Event=elliptical.Event;
    var $Cookie=elliptical.$Cookie;
    var $Session=elliptical.$Session;
    var Sort = elliptical.Sort;
    var $Sort = elliptical.$Sort;
    var DomEvent = elliptical.DomEvent;
    var $Rest = elliptical.$Rest;
    var PRELOAD_DELAY=0;
    var Morph=null;
    
    //set Rest endpoint props
    $Rest.protocol = 'http';
    $Rest.host = '';
    $Rest.path = '';
    $Rest.port = 80;

    var $rest = new $Rest();

    //Google Rest
    var $googleRest= new $Rest({
        protocol:'https',
        path:'/maps/api/geocode/json',
        port:443,
        host:'maps.googleapis.com'
    });
    //Google Service
    app.SERVER_KEY='';
    app.MAP_KEY='';
    var GeoService=Service.extend({},{});

    //define onSend handler to set basic authorization for requests
    $rest.onSend=function(options, entity,callback){
        var token = $Cookie.get('token');
        options.authorization=http.encodeBasicToken(token);
        callback.call(this,null,options);
    };

    //asp.net OData prop settings for pagination
    Service.$paginationProvider.count = 'count';
    Service.$paginationProvider.data = 'items';

    var container=app.container; //app Dependency Injection container

    //app title
    app.context.siteTitle='My Dashboard';
    app.context.displayTitle='';///==='hide', to hide

    //disable dashboard widgets && floating action button(fab)
    app.context.disableDashboard=''; ///=='disabled', to disable
    app.context.fabHide=''; ///=='hide', to hide

    //views root
    var viewsRoot='/app/views';
    var $Template = elliptical.$Template; ///template provider
    $Template.setRoot(viewsRoot);  ///set views root

    //registrations
    container.mapType('Service', Service, $rest);
    container.mapType('GeoService', GeoService, $googleRest);
    container.mapType('Sort',Sort, $Sort);
    container.mapType('Notify',elliptical.Notify,elliptical.$Notify);
    container.registerType('$Rest',$Rest);
    container.registerType('Location',Location);
    container.registerType('Event',Event);
    container.registerType('$Local',elliptical.$Local);
    container.registerType('$Cookie',$Cookie);
    container.registerType('$Session',$Session);
    container.registerType('DomEvent', DomEvent);
    container.registerType('Async', window.async.series);
    container.registerType('Waterfall', window.async.waterfall);
    container.registerType('Moment', window.moment);
    container.registerType('Try',elliptical.Try);
    container.registerType('$ViewData',elliptical.$ViewData);

    app.configure('production',function(){
        PRELOAD_DELAY=3500;
    });

    app.configure(function(){
        //use hashTags for url routing
        app.PAGE_SIZE=20;
        app.GRID_SIZE=10;
        app.hashTag=true;

        // middleware service locator
        app.use(elliptical.serviceLocator());

        ///global callback to handle route authentication
        app.use(elliptical.globalCallback(function (req, res, next) {
            if(!Morph) Morph=container.getType('Morph');
            Morph.reset();
            var tokenCookie=req.cookies.token;
            if(!tokenCookie  && req.route !=='/profile/login'){
                Location.href='/Profile/Login';
            }else{
                next();
            }
        }));

        //app.router
        app.use(app.router);

        //error
        app.use(elliptical.httpError());

        //http 404
        app.use(elliptical.http404());
    });

    app.PRELOAD_DELAY=PRELOAD_DELAY;

    /* listen */
    app.listen(true,function(){
        //load in the menu and toolbar into the global layout on page load
        $.get(viewsRoot + '/shared/md-menu.html',function(data){
            var menuPlaceholder=$('[data-menu-placeholder]');
            menuPlaceholder.html(data);
        });
        $.get(viewsRoot + '/shared/md-toolbar.html',function(data){
            var toolbarPlaceholder=$('[data-toolbar-placeholder]');
            toolbarPlaceholder.html(data);
        });
        //set site title in title tag
        $('title').html(app.context.siteTitle);

        setTimeout(function(){
            $('body')[0].removeAttribute('preload');
            $('paper-drawer-panel').attr('style','');
        },PRELOAD_DELAY);

    }); //single page app

    return app;

})(elliptical.module);