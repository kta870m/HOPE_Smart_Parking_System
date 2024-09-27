import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest";

export async function train(input, output, predict) {
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [input[0].length]}));

    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    const xs = tf.tensor2d(input, [input.length, input[0].length ? input[0].length : 1]);
    const ys = tf.tensor2d(output, [output.length, output[0].length ? output[0].length : 1]);
    await model.fit(xs, ys, {epochs: 250});
    //return model;
    const prediction = await model.predict(tf.tensor2d(predict, [predict.length, predict[0].length ? predict[0].length : 1]));
    return prediction.array();
}

export async function predict(model, input, shape) {
    const prediction = await model.predict(tf.tensor2d(input, [input.length, shape]));
    prediction.array().then(array => {
        console.log(array);
    });
}


// export async function train(input, output, predict) {
//     const model = tf.sequential();

//     // Add multiple layers
//     model.add(tf.layers.dense({units: 32, activation: 'relu', inputShape: [input[0].length]}));
//     model.add(tf.layers.dense({units: 16, activation: 'relu'}));
//     model.add(tf.layers.dense({units: 1})); // Output layer

//     model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

//     const xs = tf.tensor2d(input, [input.length, input[0].length]);
//     const ys = tf.tensor2d(output, [output.length, output[0].length]);
//     await model.fit(xs, ys, {epochs: 250});

//     const prediction = await model.predict(tf.tensor2d(predict, [predict.length, predict[0].length]));
//     return prediction.array();
// }

