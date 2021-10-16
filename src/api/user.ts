import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { IUser } from "../Interfaces/Login/login";
import { IUserDbProps } from "../Interfaces/Login/user";
import { db } from "../utils/firebaseConfig";

const getUsers = async () => {
  const response: IUserDbProps[] = [];
  const consulta = collection(db, 'users');
  let resultado = await getDocs(consulta);
  if (resultado && resultado.docs.length > 0) {
    resultado.docs.forEach(documento => {
      // console.log('documento = ', documento.data());
      response.push({
        displayName: documento.data().displayName,
        email: documento.data().email,
        roles: documento.data().roles,
        id: documento.data().id,
        superadmin: documento.data().superadmin || false,
      });
    })
  }
  return response;
};

const getUserById = async (uid: string) => {
  try {
    const consulta = doc(db, 'users', uid);
    let resultado = await getDoc(consulta);
    return resultado.data(); 
  } catch (error) {
    console.log('Error = ', error);
  }
};

const updateUser = async (user: IUserDbProps) => {
  const { id, email, displayName, roles } = user;
  if (id) {
    const dataUser: IUser = {
      id,
      email,
      displayName,
      roles
    };
    let referencia = doc(db, 'users', id);
    return setDoc(referencia, dataUser);
  }
  return false;
};

export {
  getUsers,
  getUserById,
  updateUser
}
