let interval;

function get_current_time()
{
    return Date.now();
}

function millis_to_min_sec(millis) {
    let minutes = Math.floor(millis/60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return (minutes < 9 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function start_timer()
{
    if (run) {
        let start_time = Date.now();
        interval = window.setInterval(function() {
            let time_passed_ms = get_current_time() - start_time;
            document.getElementById("timer").innerText = millis_to_min_sec(time_passed_ms);
        }, 100);
    }
}

function stop_timer()
{
    clearInterval(interval);
}