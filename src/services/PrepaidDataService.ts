import http from "./http-commons";

class PrepaidDataService {
  async getPlans(
    category: string,
    voucherType: string,
    circleCode: string,
    zoneCode: string
  ): Promise<any> {
    const headers = {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };

    var body = new FormData();
    body.append("category", category);
    body.append("type", voucherType);
    body.append("circleCode", circleCode);
    body.append("zoneCode", zoneCode);
    body.append("svctype", "PPGSM");

    return await http.post("/prepaiddata.do", body, { headers });
  }

  async popularVouchers(): Promise<any> {
    const headers = {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };

    var body = new FormData();
    body.append("circleCode", "3");
    body.append("zoneCode", "S");
    body.append("svctype", "PPGSM");

    return await http.post("/popularvouchers", body, { headers });
  }
}

export default new PrepaidDataService();
