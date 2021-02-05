class Rest {
  private readonly base: any;
  private readonly headers: any;
  constructor(arg: { url: string; headers?: any }) {
    this.base = arg.url;
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...arg.headers,
    };
  }

  private getUrl(path: string) {
    return `${this.base}${path}`;
  }

  async request(
    verb: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    data: any
  ) {
    try {
      const url = this.getUrl(path);
      return await fetch(url, {
        headers: this.headers,
        method: verb,
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }
}

export default Rest;
