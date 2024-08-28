export const backendUrl = "http://localhost:4000/api";

export function getGoogleAuthUrlUser() {
  return `${backendUrl}/auth/google`;
}

export function getGoogleAuthUrlAdmin() {
  return `${backendUrl}/auth/google/admin`;
}

export function validateSessionUrl() {
  return `${backendUrl}/sessions`;
}

export function createPasswordSessionUrl() {
  return `${backendUrl}/sessions/password`;
}

export function resourcesUrlAll() {
  return `${backendUrl}/resources`;
}
export function resourceUrlById(id: string) {
  return `${backendUrl}/resources/${id}`;
}
export function categoriesUrlAll() {
  return `${backendUrl}/categories`;
}
export function categoryUrlById(id: string) {
  return `${backendUrl}/categories/${id}`;
}

export function registerUrl() {
  return `${backendUrl}/users/register`;
}
export function contactFormUrl() {
  return `${backendUrl}/users/contact`;
}

export function registerUrlGoogle(id: string) {
  return `${backendUrl}/users/register/google/${id}`;
}

export function variantUrlById(id: string) {
  return `${backendUrl}/variants/${id}`;
}

export function currencyUrl() {
  return `${backendUrl}/currencies`;
}
export function currencyUrlById(id: string) {
  return `${backendUrl}/currencies/${id}`;
}

export function getServiceRequestUrl() {
  return `${backendUrl}/service-requests`;
}
export function getServiceRequestUrlAdmin() {
  return `${backendUrl}/service-requests/admin`;
}
