async function googleVision() {
    const vision = require('@google-cloud/vision');
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    const fileName = 'example5.jpg';

    // Detect similar images on the web to a local file
    const [result] = await client.webDetection(fileName);
    const webDetection = result.webDetection;

    if (webDetection.webEntities.length) {
        console.log(`Web entities found: ${webDetection.webEntities.length}`);
        webDetection.webEntities.forEach(webEntity => {
        console.log(`Description: ${webEntity.description}`); 
        });
    }

    if (webDetection.bestGuessLabels.length) {
        console.log(
        `Best guess labels found: ${webDetection.bestGuessLabels.length}`
    );
        webDetection.bestGuessLabels.forEach(label => {
        console.log(`  Label: ${label.label}`);
        });
    }
}
googleVision();