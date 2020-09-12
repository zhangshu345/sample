requiresAutojsVersion(8000001);

IntentFilter = android.content.IntentFilter;

let receiver = new BroadcastReceiver(function(ctx, intent) {
    log(intent);
});
let action = "android.intent.action.TIME_TICK";
context.registerReceiver(receiver, new IntentFilter(action));

events.on("exit", () => {
    context.unregisterReceiver(receiver);
});

setTimeout(() =>{}, 60000);