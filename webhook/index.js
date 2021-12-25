require('dotenv').config(); // Remove it when runs on prod. 

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function (context, req) {
    let data;
    let eventType;
    let event;
    let signature = req.headers['stripe-signature'];

    // Check if webhook signing is configured.
    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(`[X] Webhook signature verification failed.`);
        context.res = {
            status: 400,
            body: 'Webhook signature verification failed'
        };
        return;
    }

    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
    
    console.log(`Event triggered! : ${eventType}`);

    // Handle each events from here
    if (eventType === 'customer.created') {
        
    }
}