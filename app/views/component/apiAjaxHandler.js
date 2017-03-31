export default {
  handle(res) {
    if (res.body.code !== 0 || res.body.code !== 1) {
      return res.body.message;
    }
  }
}