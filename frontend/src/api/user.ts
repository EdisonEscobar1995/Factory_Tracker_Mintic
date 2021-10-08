import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { IUserDbProps } from "../Interfaces/Login/user";
import { db } from "../utils/firebaseConfig";

const getUsers = async () => {
  const response: IUserDbProps[] = [];
  const consulta = collection(db, 'users');
  let resultado = await getDocs(consulta);
  if (resultado && resultado.docs.length > 0) {
    resultado.docs.forEach(documento => {
      console.log('documento.data() == ', documento.data());
      response.push({
        displayName: documento.data().displayName,
        email: documento.data().email,
        roles: documento.data().rol,
        id: documento.data().id
      });
    })
  }
  return response;
};

const getUserById = async (uid: string) => {
  const consulta = doc(db, 'users', uid);
  let resultado = await getDoc(consulta);
  return resultado.data();
};

const updateUser = async () => {
  
};

export {
  getUsers,
  getUserById
}
