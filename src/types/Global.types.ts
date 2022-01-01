export interface Plan {
  circle_id: string;
  validity: string;
  subcategory: string;
  plan_id: string;
  plan_name: string;
  remarks: string;
  denomination: string;
}

export interface Circle {
  CIRCLE_ID: number;
  CIRCLE_NAME: string;
  ZONE_ID: number;
  ZONE_NAME: string;
  CIRCLE_CODE: string;
  ZONE_CODE: string;
}

export interface VoucherTypes {
  id: number;
  category: string;
  name: string;
  color: string;
  icon: string;
}

export interface VoucherPrice {
  denom: string;
  description: string;
  name: string;
  planid: string;
  validity: string;
  voucherType?: string;
  processingcharge?: string;
  remarks?: string;
  servicetax?: string;
  talk_value?: string;
}
