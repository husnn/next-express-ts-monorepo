const config = {
  imagexUrl:
    process.env.IMAGEX_URL ||
    `http://0.0.0.0:${process.env.IMAGEX_PORT || 9000}`
};

export default config;
