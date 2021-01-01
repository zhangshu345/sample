var running = true;

threads.start(function(){
    while(running){
        log("running = true");
        sleep(1000)
    }
});

sleep(2000);
running = false;
console.info("running = false");
