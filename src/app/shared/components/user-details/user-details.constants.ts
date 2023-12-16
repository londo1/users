export const getUpdateUserUrl = (userId: number) =>
  `https://jsonplaceholder.typicode.com/posts/${userId}`;

export const getUserUrl = (userId: number) =>
  `https://jsonplaceholder.typicode.com/users/${userId}`;

export const USER_DETAILS_FIELDS = [
  { name: ["username"], label: "Username", rules: [{ required: true }] },
  { name: ["name"], label: "Name" },
  { name: ["email"], label: "Email", rules: [{ required: true }] },
  { name: ["website"], label: "Website" },
  { name: ["phone"], label: "Phone" },
];

export const COMPANY_DETAILS_FIELDS = [
  { name: ["company", "name"], label: "Company Name" },
  { name: ["company", "catchPhrase"], label: "Catch Phrase" },
  { name: ["company", "bs"], label: "Business" },
];

export const ADDRESS_FIELDS = [
  { name: ["address", "street"], label: "Street", rules: [{ required: true }] },
  { name: ["address", "suite"], label: "Suite", rules: [{ required: true }] },
  { name: ["address", "city"], label: "City", rules: [{ required: true }] },
  { name: ["address", "zipcode"], label: "Zipcode" },
];

export const GEOGRAPHIC_COORDINATE_FIELDS = [
  { name: ["address", "geo", "lat"], label: "Latitude" },
  { name: ["address", "geo", "lng"], label: "Longitude" },
];
