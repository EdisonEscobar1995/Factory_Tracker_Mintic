const jsonErrors: any = {
  'auth/email-already-in-use': 'El correo electronico ya ha sido registrado en el sistema!'
};

export const getErrors = (code: string) => {
  return jsonErrors[code];
}
