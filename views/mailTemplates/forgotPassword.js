function forgotPassword(recoveryToken) {
  return `<b>To jest losowy token: http:localhost:8000/api/forgot?${recoveryToken}.</b>`;
}
export { forgotPassword };
