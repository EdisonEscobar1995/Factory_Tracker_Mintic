import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { IDataMenu } from "../Interfaces/menu";
import { app } from "../utils/firebaseConfig";
import { getUser } from "./login";

const db = getFirestore(app);

const getMenus = async (user: any) => {
  const response: IDataMenu[] = [];
  const localMenus = JSON.parse(localStorage.getItem('menus') || '[]');
  console.log('localMenus == ', localMenus);
  if (localMenus.length > 0) return localMenus;
  const userLog = await getUser(user.uid);
  console.log('user = ', user);
  if (userLog) {
    console.log('userLog === ', userLog.roles);
    const consulta = collection(db, 'menus');
    const roles = Object.keys(userLog.roles);
    const q = query(consulta, where("rol", "array-contains-any", roles));
    let resultado = await getDocs(q);
    console.log('resultado == ', resultado.docs);
    if (resultado && resultado.docs.length > 0) {
      resultado.docs.forEach(documento => {
        response.push({
          index: documento.data().index,
          rol: documento.data().rol,
        })
      })
    }
    localStorage.setItem('menus', JSON.stringify(response));
  }
  return response;
};

export {
  getMenus
}
