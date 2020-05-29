// import * as Sentry from "@sentry/browser";

function init(){
    // Sentry.init({
    //   dsn: "https://bb699b210f2d43e6a9384748de5eb0ce@sentry.io/5188842",
    // });
}

function log(error){
    // Sentry.captureException(error);
    console.log(error);
}

export default{
    init,log
}
