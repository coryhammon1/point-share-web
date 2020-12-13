const tfOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
};

const tf = new Intl.DateTimeFormat("en-US", tfOptions);

export function timeFormat(ts) {
    return tf.format(ts);
}