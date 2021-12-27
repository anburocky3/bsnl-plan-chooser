import http from "./http-commons";

class DataService {
  async getCircles(): Promise<any> {
    return await http.get("/JSON/circles_prepaid.json?1640625165148");
  }
}

export default new DataService();
